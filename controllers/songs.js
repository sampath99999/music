const mongoose = require("mongoose");
const songModel = require("../models/songs");
const songsModel = require("../models/songs");
const { getArtistNameById } = require("./artists");

//SECTION Creat Song
module.exports.createSong = (songDetails, callback) => {
    const song = new songsModel(songDetails);
    song.save((err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message,
            });
        } else {
            callback({
                status: true,
                data: data,
            });
        }
    });
};
//!SECTION Create Song

//SECTION Read Song by ID
module.exports.readSongById = (songID, callback) => {
    songsModel.findOne({ _id: songID }, (err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err,
            });
        }
        callback({
            status: true,
            data: data,
        });
    });
};
//!SECTION Read Song by ID

//SECTION Read Songs
module.exports.readSongs = (callback) => {
    songsModel.find({}, (err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message,
            });
        }
        callback({
            status: true,
            data: data,
        });
    });
};
//!SECTION Read Songs

//SECTION Update song
module.exports.updateSong = (movieId, movie, callback) => {
    songsModel.findOneAndUpdate({ _id: movieId }, movie, (err, data) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message,
            });
        }
        callback({
            status: true,
            message: "Song Updated!",
        });
    });
};
//!SECTION Update song

//SECTION Delete song
module.exports.deleteSong = (movieId, callback) => {
    songsModel.deleteOne({ _id: movieId }, movie, (err) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message,
            });
        } else {
            callback({
                status: true,
                message: "Song Deleted!",
            });
        }
    });
};
//!SECTION Delete song

// SECTION Read song by movieID
module.exports.getSongsByMovieID = (movieId, callback) => {
    songModel.find({ movie: movieId }, (err, songs) => {
        if (err) {
            callback({
                status: false,
                message: "DB error: " + err.message,
            });
        } else {
            const temp = new Promise((resolve, reject) => {
                for(let i=0; i<songs.length; i++){
                    getArtistNameById(songs[i].artist, (artistName) => {
                        songs[i].artist = artistName;
                    });
                    if(i == songs.length - 1) resolve()
                }
            });
            temp.then(() => {
                callback({
                    status: true,
                    data: songs,
                });
            });
        }
    });
};
// !SECTION Read song by movieID
