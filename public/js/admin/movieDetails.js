// Player Functions
function audioPlaying() {
    $("#playing").children(".feather").replaceWith(feather.icons["pause"].toSvg());
    $("#playing").attr("onclick", "pause(this)");
}

function audioPaused() {
    $("#playing").children(".feather").replaceWith(feather.icons["play"].toSvg());
    $("#playing").attr("onclick", "resume(this)");
}

function play(ele) {
    let player = document.getElementById("audioPlayer");
    if (player.getAttribute("src") != "") {
        player.pause();
        $("#playing")
            .children(".feather")
            .replaceWith(feather.icons["play"].toSvg());
        $("#playing").attr("onclick", "play(this)");
        $("#playing").attr("id", "");
    }
    $(ele).attr("id", "playing");
    player.setAttribute("src", ele.getAttribute("data-link"));
    player.load();
    player.play();
}

function pause(ele) {
    $(ele).attr("onclick", "resume(this)");
    document.getElementById("audioPlayer").pause();
    $(ele).children(".feather").replaceWith(feather.icons["play"].toSvg());
}

function resume(ele) {
    player = document.getElementById("audioPlayer");
    if (ele.getAttribute("data-link") != player.getAttribute("src")) {
        play(ele);
    } else {
        document.getElementById("audioPlayer").play();
        $(ele).attr("onclick", "pause(this)");
        $(ele).children(".feather").replaceWith(feather.icons["pause"].toSvg());
    }
}

// !SECTION play function

function openNewSongModal() {
    toggleDialog();
    document.getElementById("songName").value = "";
    document.getElementById("songLink").value = "";
    document.getElementById("songDuration").value = "";
    document.getElementById("saveBtn").setAttribute("onclick", "createSong()");
}

// SECTION Toggle Dialog
function toggleDialog() {
    if (
        document.getElementById("modal").style.display == "none" ||
        document.getElementById("modal").style.display == ""
    ) {
        document.getElementById("modal").style.display = "flex";
        $("#artists").css("overflow", "hidden");
    } else {
        document.getElementById("modal").style.display = "none";
        $("#artists").css("overflow", "auto");
        $("#moviePoster").attr("src", "/images/notfound.png");
    }
}
// !SECTION Toggle Dialog

// SECTION Create new movie
async function createSong() {
    var data = {
        name: document.getElementById("songName").value,
        link: document.getElementById("songLink").value,
        duration: document.getElementById("songDuration").value,
        artist: document.getElementById("songArtist").value,
        movie: $("#saveBtn").attr("data-id"),
        method: "new",
    };
    if ((await checkSongData(data)) == false) {
        alert("Check details!");
        return;
    } else {
        $.post("/admin/songs", data, function (response) {
            if (response.status == true) {
                location.reload();
            } else {
                if (response.error == "logout!") {
                    console.log("Logout"); //TODO call logout
                } else {
                    alert(response.error);
                }
            }
        });
    }
}
// !SECTION Create new movie

// SECTION Checking movie Data
function checkSongData(data) {
    if (
        data.name == "" ||
        data.link == "" ||
        data.duration == "" ||
        data.artist == ""
    ) {
        return false;
    } else {
        return true;
    }
}
// !SECTION Checking movie Data

// SECTION getDuration
function getDuration(src, cb) {
    var audio = new Audio();
    $(audio).on("loadedmetadata", function () {
        cb(audio.duration);
    });
    audio.src = src;
}
// !SECTION getDuration
