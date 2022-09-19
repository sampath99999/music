var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
var jwt = require("jsonwebtoken");
const session = require("express-session");

router.get("/", (req, res) => {
    res.render("admin/index.ejs");
    console.log(req.session)
});

router.post("/", (req, res) => {
    const adminDetails = req.body;
    adminController.loginAdmin(adminDetails, (response) => {
        if (response.status == true) {
            const token = jwt.sign({ userid: response._id }, process.env.SECRET);
            const session = req.session
            session.loggedIn = true;
            session.token = token;
            res.redirect("/admin/dashboard");
        } else {
            res.render("admin/index.ejs", {error: response.message});
        }
    });
});

router.get("/dashboard", (req,res) => {
    res.render("admin/dashboard")
})

module.exports = router;
