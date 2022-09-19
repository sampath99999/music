const mongoose = require("mongoose");
const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");

//SECTION Create Admin
module.exports.createAdmin = async (adminDetails, callback) => {
    adminDetails.password = await bcrypt.hash(adminDetails.password, 12);
    this.checkAdminExists(adminDetails, function (status) {
        if (status == true) {
            callback({
                status: true,
                message: "Username already exists",
            });
        } else {
            const admin = new adminModel(adminDetails);
            admin.save((err, admin) => {
                if (err) {
                    callback({
                        status: false,
                        message: "DB Error: " + err.message,
                    });
                    callback({
                        status: true,
                        data: admin,
                    });
                }
            });
        }
    });
};
//!SECTION Create Admin

//SECTION check if admin exists
module.exports.checkAdminExists = (adminDetails, callback) => {
    adminModel.findOne({ username: adminDetails.username }, (err, admin) => {
        if (admin) {
            callback(true);
        } else {
            callback(false);
        }
    });
};
//!SECTION check if admin exists

//SECTION Login Admin
module.exports.loginAdmin = (admin, callback) => {
    adminModel.findOne({ username: admin.username }, (err, doc) => {
        if (err) {
            callback({
                status: false,
                message: "DB Error: " + err.message,
            });
        }
        if (doc) {
            bcrypt.compare(
                admin.password,
                doc.password,
                function (err, result) {
                    if (err) {
                        callback({
                            status: false,
                            message: "DB Error: " + err.message,
                        });
                    }
                    if (result) {
                        callback({
                            status: true,
                            data: doc,
                        });
                    } else {
                        callback({
                            status: false,
                            message: "Wrong password!",
                        });
                    }
                }
            );
        } else {
            callback({
                status: false,
                message: "Username not found!",
            });
        }
    });
};
//!SECTION Login Admin
