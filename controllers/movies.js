const mongoose = require("mongoose");
const movieModel = require("../models/movies")

//SECTION Creat Movie
module.exports.createMovie = (movieDetails, callback) => {
    movie = new movieModel(movieDetails)
    movie.save()
        .then((result) => {
            callback({
                status: "success",
                data: result
            })
        })
        .catch((err) => {
            callback({
                status: "error",
                message: "DB Error: " + err.message
            })
        })
}
//!SECTION Creat Movie

//SECTION Read Movie by ID
module.exports.readMovieById = (movieId, callback) => {
    movieModel.findOne({ _id: movieId }, (err, movie) => {
        if (err) {
            callback({
                status: "error",
                message: "DB Error: " + err.message
            })
        }
        callback({
            status: "success",
            data: movie
        })
    })
}
//!SECTION Read Movie by ID

//SECTION Read movies
module.exports.readMovies = (callback) => {
    movieModel.find({}, (err, movies) => {
        if (err) {
            callback({
                status: "error",
                message: "DB Error: " + err.message
            })
        }
        callback({
            status: "success",
            data: movies
        })
    })
}
//!SECTION Read Movies

//SECTION Update Movie
module.exports.updateMovie = (movieId, movie, callback) => {
    movieModel.findOneAndUpdate({ _id: movieId }, movie, (err, movie) => {
        if (err) {
            callback({
                status: "error",
                message: "DB Error: " + err.message
            })
        }
        callback({
            status: "success",
            data: movie
        })
    })
}
//!SECTION Update Movie

//SECTION Delete Movie
module.exports.deleteMovie = (movieId, callback) => {
    movieModel.deleteOne({ _id: movieId }, {}, (err) => {
        if (err) {
            callback({
                status: "error",
                message: "DB Error: " + err.message
            })
        }
        callback({
            status: "success",
            message: "Movie deleted successfully!"
        })
    })
}
//!SECTION Delete Movie

