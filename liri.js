require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys");
var Spotify = require("node-spotify-api")
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var request = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


function liriBot (request, userInput) {
    switch (request) {
        case "concerts-this":
            getBandsInTown(userInput);
            break;

        case "spotify-song":
            getSpotify(userInput);
            break;

        case "movie-this":
            getOMDB(userInput);
            break;

        case "follow-command":
            getRandom();
        break;
    };
};