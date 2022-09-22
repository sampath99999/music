const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: String,
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'artists'},
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'movies'},
    duration: Number,
    link: String,
})

const songModel = mongoose.model('songs', songSchema)
module.exports = songModel