var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
var jwt = require("jsonwebtoken");
const session = require("express-session");

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
        if(response == true){
            res.render("admin/dashboard")
        } else {
            res.redirect("/admin")
        }
    })
});

router.get("/artists", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if(response == true){
            res.render("admin/artists")
        } else {
            res.redirect("/admin")
        }
    })
});

module.exports.checkIfAdminIsReal = (session, callback) => {
    if (session.loggedIn == true) {
        var decoded = jwt.verify(session.token, process.env.SECRET);
        adminController.checkAdminExists(decoded.userid, (response) => {
            callback(response);
        });
    } else {
        callback(false)
    }
}

module.exports = router;
