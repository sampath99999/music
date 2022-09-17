const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    rating: Number,
    genre: String,
    poster: String,
    year: String
})

const movieModel = mongoose.model('movies', movieSchema)

module.exports = movieModel;