const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: String,
    about: String,
    rating: Number,
    cover: String,
    year: String
})

const movieModel = mongoose.model('movies', movieSchema)

module.exports = movieModel;