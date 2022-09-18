const mongoose = require("mongoose")
const songsModel = require("../models/songs")

//SECTION Creat Song
module.exports.createSong = (songDetails, callback) => {
    const song = new songsModel(songDetails)
    song.save((err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message,
            })
        }
        callback({
            status: true,
            data: data,
        })
    })
}
//!SECTION Create Song

//SECTION Read Song by ID
module.exports.readSongById = (songID, callback) => {
    songsModel.findOne({ _id: songID }, (err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err
            })
        }
        callback({
            status: true,
            data: data,
        })
    })
}
//!SECTION Read Song by ID

//SECTION Read Songs
module.exports.readSongs = (callback) => {
    songsModel.find({}, (err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message
            })
        }
        callback({
            status: true,
            data: data,
        })
    })
}
//!SECTION Read Songs

//SECTION Update song
module.exports.updateSong = (movieId, movie, callback) => {
    songsModel.findOneAndUpdate({ _id: movieId }, movie, (err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message
            })
        }
        callback({
            status: true,
            message: "Song Updated!"
        })
    })
}
//!SECTION Update song

//SECTION Delete song
module.exports.deleteSong = (movieId, callback) => {
    songsModel.deleteOne({ _id: movieId }, movie, (err) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message
            })
        }
        callback({
            status: true,
            message: "Song Deleted!"
        })
    })
}
//!SECTION Delete song