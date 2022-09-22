const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: String,
    artist: String,
    movie: String,
    duration: Number,
    link: String,
})

const songModel = mongoose.model('songs', songSchema)
module.exports = songModel