require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys");
var Spotify = require("node-spotify-api")
var dotenv = require("dotenv")
var fs = require("fs");


var request = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


function liriBot(request, userInput) {
    
    switch (request) {
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

// Function for spotify-this
function getSpotify(songName) {
    var spotify = new Spotify(keys.spotify);
  
      if(!songName) {
        songName = "Helena";
      };
  
    spotify.search({type: 'track', query: songName}, function (err, data) {
      if(err) {
        return console.log('Error occurred: ' + err);
      };
    
      //  Line break 
      console.log("\r\n" + "===============================" + "\r\n");
      // Returns Artists
      console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
      // Returns the Song name
      console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
      // Preview link to Song Cover
      console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
      // Returns Album name
      console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
  
     //  Puts Results in txt file
      var logSong = "\r\n" + "===== Begin spotify-this log =====" + "\r\n" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\r\n" + "\nSong Name: " + data.tracks.items[0].name + "\r\n" +  "\nSong Preview Link: " + data.tracks.items[0].href + "\r\n" +  "\nAlbum: " + data.tracks.items[0].album.name + "\r\n" + "\n===== End spotify-this log ====" + "\r\n";
  
      fs.appendFile("log.txt", logSong, function(err) {
        if (err) throw err;
      });
  
    });
  };

// Movie Information Function

function getOMDB(movie) {
    // If no movie is selected, shows fight club data
    if (!movie) {
      movie = "Fight Club";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=shor&apikey=trilogy";
  
    axios.request(movieQueryUrl).then(
      function (response) {
       
        // line break followed by Movie info
        console.log("\r\n" + "===============================" + "\r\n");
        console.log("Title: " + response.data.Title + "\r\n");
        console.log("Year Released: " + response.data.Year + "\r\n");
        console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
        console.log("Country Origin: " + response.data.Country + "\r\n");
        console.log("Language: " + response.data.Language + "\r\n");
        console.log("Plot: " + response.data.Plot + "\r\n");
        console.log("Actors: " + response.data.Actors + "\r\n");
  
        var logMovie = "\r\n" + "======== Begin movie-this log  =======" + "\r\n" + "\nMovie title: " + response.data.Title + "\nYear released: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry Where Produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\r\n" + "\n========= End movie-this log  ======" + "\r\n";
  
        fs.appendFile("log.txt", logMovie, function (err) {
            if (err) throw err;
        });
  });
  };
  

liriBot(request, userInput)
