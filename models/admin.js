const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
})

const adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;