const moongose = require("mongoose");
const artistModel = require("./../models/artists");

// SECTION create artist
// @params Artistdetails
// {
//     name, cover, about
// }
module.exports.createArtist = (artistDetails, callback) => {
    // Creating new artist with details
    artist = new artistModel(artistDetails);

    // saving created artist
    artist
        .save()
        .then((doc) => {
            callback({
                code: true,
                message: "Artist Created!",
            });
        })
        .catch((err) => {
            callback({
                code: false,
                message: "DB Error:" + err,
            });
        });
};
//!SECTION create artist

//SECTION Edit artist
module.exports.editArtist = (artistId, artistDetails, callback) => {
    artistModel.updateOne({ _id: artistId }, artistDetails, (err, doc) => {
        if (err) {
            callback({
                code: false,
                message: "DB Error:" + err.message,
            });
        } else {
            callback({
                code: true,
                message: "Artist Updated!",
            });
        }
    });
};
//!SECTION Edit artist

//SECTION Delete artist
module.exports.deleteArtist = (artistID, callback) => {
    artistModel.deleteOne({ _id: artistID }, (err) => {
        if (err) {
            callback({
                code: false,
                message: "DB Error:" + err,
            });
        } else {
            callback({
                code: true,
                message: "Artist Deleted!",
            });
        }
    });
};
//!SECTION Delete artist

//SECTION get artist
module.exports.readArtist = (artistID, callback) => {
    artistModel.findOne({ _id: artistID }, (err, doc) => {
        if (err) {
            callback({
                code: false,
                message: "DB Error:" + err,
            });
        }

        callback({
            code: true,
            data: doc,
        });
    });
};
//!SECTION get artist

//SECTION get artists
module.exports.getArtists = (callback) => {
    artistModel.find({}, (err, doc) => {
        if (err) {
            callback({
                code: false,
                message: "DB Error:" + err,
            });
        }
        callback({
            code: true,
            data: doc,
        });
    });
};
//!SECTION get artists
