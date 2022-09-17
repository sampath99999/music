const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    name: String,
    cover: String,
    about: String
})

const artistModel = mongoose.model("artists", artistSchema);
module.exports = artistModel