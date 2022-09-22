var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
var jwt = require("jsonwebtoken");
const session = require("express-session");
const {
    getArtists,
    createArtist,
    deleteArtist,
    editArtist,
    getArtistsList,
} = require("../controllers/artists");
const {
    readMovies,
    createMovie,
    deleteMovie,
    readMovieById,
} = require("../controllers/movies");
const { createSong, getSongsByMovieID } = require("../controllers/songs");
const { response } = require("express");

router.get("/", (req, res) => {
    const session = req.session;
    if (session.loggedIn == true) {
        res.redirect("admin/dashboard");
    } else {
        res.render("admin/index.ejs");
    }
});

router.post("/", (req, res) => {
    const adminDetails = req.body;
    adminController.loginAdmin(adminDetails, (response) => {
        if (response.status == true) {
            const token = jwt.sign(
                { userid: response.data._id },
                process.env.SECRET
            );
            const session = req.session;
            session.loggedIn = true;
            session.token = token;
            res.redirect("/admin/dashboard");
        } else {
            res.render("admin/index.ejs", { error: response.message });
        }
    });
});

router.get("/dashboard", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            res.render("admin/dashboard");
        } else {
            res.redirect("/admin");
        }
    });
});

router.get("/artists", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            getArtists((artists) => {
                res.render("admin/artists", { artists: artists.data });
            });
        } else {
            res.redirect("/admin");
        }
    });
});

router.post("/artists", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            const details = req.body;
            if (details.method == "new") {
                delete details.method;
                if (
                    details.name == "" ||
                    details.cover == "" ||
                    details.about == ""
                ) {
                    res.send({
                        status: false,
                        error: "All Details Required!",
                    });
                } else {
                    createArtist(details, (createResponse) => {
                        if (createResponse.code == true) {
                            res.send({
                                status: true,
                            });
                        } else {
                            res.send({
                                status: false,
                                error: createResponse.message,
                            });
                        }
                    });
                }
            } else {
                if (details.method == "delete") {
                    deleteArtist(details.id, (deleteArtistResponse) => {
                        if (deleteArtistResponse.code == true) {
                            res.send({
                                status: true,
                            });
                        } else {
                            res.send({
                                status: false,
                                error: deleteArtistResponse.message,
                            });
                        }
                    });
                } else {
                    if (details.method == "edit") {
                        delete details.method;
                        if (
                            details.name == "" ||
                            details.cover == "" ||
                            details.about == "" ||
                            details.id == ""
                        ) {
                            res.send({
                                status: false,
                                error: "All Details Required!",
                            });
                        } else {
                            const id = details.id;
                            delete details.id;
                            editArtist(id, details, (editArtistResponse) => {
                                if (editArtistResponse.code == true) {
                                    res.send({ status: true });
                                } else {
                                    res.send({
                                        status: false,
                                        error: editArtistResponse.message,
                                    });
                                }
                            });
                        }
                    }
                }
            }
        } else {
            res.send({
                status: false,
                error: "logout!",
            });
        }
    });
});

router.get("/movies", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            readMovies((movies) => {
                res.render("admin/movies", { movies: movies.data });
            });
        } else {
            res.redirect("/admin");
        }
    });
});

// SECTION Movies Post
router.post("/movies", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            const details = req.body;
            if (details.method == "new") {
                delete details.method;
                createMovie(details, (createResponse) => {
                    if (createResponse.status == true) {
                        res.send({
                            status: true,
                        });
                    } else {
                        res.send({
                            status: false,
                            error: createResponse.message,
                        });
                    }
                });
            } else {
                if (details.method == "delete") {
                    deleteMovie(details.id, (deleteMovieResponse) => {
                        if (deleteMovieResponse.status == true) {
                            res.send({
                                status: true,
                            });
                        } else {
                            res.send({
                                status: false,
                                error: deleteMovieResponse.message,
                            });
                        }
                    });
                } else {
                    if (details.method == "edit") {
                        delete details.method;
                        if (
                            details.name == "" ||
                            details.cover == "" ||
                            details.about == "" ||
                            details.id == ""
                        ) {
                            res.send({
                                status: false,
                                error: "All Details Required!",
                            });
                        } else {
                            const id = details.id;
                            delete details.id;
                            editArtist(id, details, (editArtistResponse) => {
                                if (editArtistResponse.status == true) {
                                    res.send({ status: true });
                                } else {
                                    res.send({
                                        status: false,
                                        error: editArtistResponse.message,
                                    });
                                }
                            });
                        }
                    }
                }
            }
        } else {
            res.send({
                status: false,
                error: "logout!",
            });
        }
    });
});
// !SECTION Movies Post

// SECTION Movie Detail page
router.get("/movies/:movieid", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            readMovieById(req.params.movieid, (movie) => {
                getSongsByMovieID(req.params.movieid, songs => {
                    if (movie.status == false) {
                        res.render("admin/movieDetails", { error: true });
                    } else {
                        getArtistsList().then((artists) => {
                            res.render("admin/movieDetails", {
                                movie: movie.data,
                                artists: artists.data,
                                songs: songs.data
                            });
                        });
                    }
                })
            });
        } else {
            // res.redirect("/admin/logout")
            console.log("logout"); // TODO logout
        }
    });
});
// !SECTION Movie Detail page

// SECTION get Aritsts List
router.get("/getArtistsList", (req, res) => {
    getArtistsList().then((response) => {
        res.send(response);
    });
});
// !SECTION get Aritsts Lis

// SECTION Songs
router.post("/songs", (req, res) => {
    const session = req.session;
    this.checkIfAdminIsReal(session, (response) => {
        if (response == true) {
            const details = req.body;
            if (details.method == "new") {
                delete details.method;
                createSong(details, (createResponse) => {
                    if (createResponse.status == true) {
                        res.send({
                            status: true,
                        });
                    } else {
                        res.send({
                            status: false,
                            error: createResponse.message,
                        });
                    }
                });
            }
        } else {
            res.send({
                status: false,
                error: "logout!",
            });
        }
    });
});
// !SECTION Songs

module.exports.checkIfAdminIsReal = (session, callback) => {
    if (session.loggedIn == true) {
        var decoded = jwt.verify(session.token, process.env.SECRET);
        adminController.checkAdminExists(decoded.userid, (response) => {
            callback(response);
        });
    } else {
        callback(false);
    }
};

module.exports = router;
