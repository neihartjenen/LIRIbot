require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys");
var Spotify = require("node-spotify-api")
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var request = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


function liriBot(request, userInput) {
    
    switch (request) {
        case "concerts-this":
            getBandsInTown(userInput);
            break;

        case "spotify-this":
            getSpotify(userInput);
            break;

        case "movie-this":
            getOMDB(userInput);
            break;

        case "do-whatever":
            getRandom();
        break;
    };
};

function getSpotify(songName) {

    var spotify = new Spotify(keys.spotify);

        if(!songName) {
            songName = "Error"
        };

    spotify.search({type: 'track', query: songName}, function (err, data) {
        if(err) {
        return console.log('error occurred: ' + err);
    };
    
    // Line break
    console.log("\r\n" + "===============================" + "\r\n");
    // Returns Artists
    console.log("Artists Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
    // Returns Songs Name
    console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
    // Returns preview link of song 
    console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
    // Returns the name of the Album that the song is from
    console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

   //  Puts results into txt file 
    var logSong = "\r\n" + "===== Begin spotify-this log =====" + "\r\n" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\r\n" + "\nSong Name: " + data.tracks.items[0].name + "\r\n" +  "\nSong Preview Link: " + data.tracks.items[0].href + "\r\n" +  "\nAlbum: " + data.tracks.items[0].album.name + "\r\n" + "\n===== End spotify-this =====" + "\r\n";

    fs.appendFile("log.txt", logSong, function(err) {
      if (err) throw err;
    });
 });
};

liriBot(request, userInput)

// function getBandsInTown(artists) {

//     var artists = userInput;
// }