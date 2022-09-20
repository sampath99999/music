var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
var jwt = require("jsonwebtoken");
const session = require("express-session");
const { getArtists, createArtist } = require("../controllers/artists");

router.get("/", (req, res) => {
    const session = req.session;
    if (session.loggedIn == true) {
        res.redirect("admin/dashboard");
    } else {
        res.render("admin/index.ejs");
    }
});

router.post("/", (req, res) => {
    const adminDetails = req.body;
    adminController.loginAdmin(adminDetails, (response) => {
        if (response.status == true) {
            const token = jwt.sign(
                { userid: response.data._id },
                process.env.SECRET
            );
            const session = req.session;
            session.loggedIn = true;
            session.token = token;
            res.redirect("/admin/dashboard");
        } else {
            res.render("admin/index.ejs", { error: response.message });
        }
    });
});

router.get("/dashboard", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            res.render("admin/dashboard");
        } else {
            res.redirect("/admin");
        }
    });
});

router.get("/artists", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            getArtists((artists) => {
                res.render("admin/artists", { artists: artists.data });
            });
        } else {
            res.redirect("/admin");
        }
    });
});

router.post("/artists", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            const details = req.body;
            if (
                details.name == "" ||
                details.cover == "" ||
                details.about == ""
            ) {
                res.send({
                    status: false,
                    error: "All Details Required!",
                });
            } else {
                if (details.method == "new") {
                    delete details.method;
                    createArtist(details, (createResponse) => {
                        if (createResponse.code == true) {
                            res.send({
                                status: true,
                            });
                        } else {
                            res.send({
                                status: false,
                                error: createResponse.message,
                            });
                        }
                    });
                } else {
                    res.send({
                        status: false,
                        error: "logout!",
                    });
                }
            }
        }
    });
});

module.exports.checkIfAdminIsReal = (session, callback) => {
    if (session.loggedIn == true) {
        var decoded = jwt.verify(session.token, process.env.SECRET);
        adminController.checkAdminExists(decoded.userid, (response) => {
            callback(response);
        });
    } else {
        callback(false);
    }
};

module.exports = router;
