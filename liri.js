require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// With Axios, liriBot will import data from the bands-in-town api and the omdb api
var axios = require("axios"); 

var Spotify = require("node-spotify-api");

// Moment will be used to make the date of the concert (data returned from bands-in-town) look better
var moment = require("moment");
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
var dotenv = require("dotenv");
// The fs module provides an API for interacting with the file system 
var fs = require("fs");

// Variables for the arguments to be entered by the user
var request = process.argv[2];

// Using the slice method, create a variable for the userInput to handle entries containing more than one word 
var userInput = process.argv.slice(3).join(" ");
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
        
        case "concert-this":
          getBandsInTown(userInput);
        break;
    };
};

function getSpotify(songName) {

  var spotify = new Spotify(keys.spotify);

    // If the user does not enter song, shows information for Helena
    if(!songName) {
      songName = "Helena";
    };

  spotify.search({type: 'track', query: songName}, function (err, data) {
    if(err) {
      return console.log('Error occurred: ' + err);
    };
    
    // Line break
    console.log("\r\n" + "===============================" + "\r\n");
    // returns Artists
    console.log("Artists Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
    // returns the Song's name
    console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
    // returns preview link to song cover
    console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
    // returns Album song is from
    console.log("Album: " + data.tracks.items[0].album.name + "\r\n");


   //  Results in text file
    var logSong = "\r\n" + "===== Begin spotify-this-song log entry =====" + "\r\n" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\r\n" + "\nSong Name: " + data.tracks.items[0].name + "\r\n" +  "\nSong Preview Link: " + data.tracks.items[0].href + "\r\n" +  "\nAlbum: " + data.tracks.items[0].album.name + "\r\n" + "\n===== End spotify-this-song log entry =====" + "\r\n";

    fs.appendFile("log.txt", logSong, function(err) {
      if (err) throw err;
    });

  });
};

// Function for movie-this

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
 
  function getBandsInTown(artist) {
    var artist = userInput;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
    axios.get(bandQueryURL).then(
      function (response) {
        
        // Line Break
        console.log("\r\n" + "===============================" + "\r\n");
        console.log("Name of the musician: " + artist +  "\r\n");
        console.log("Name of the venue: " + response.data[0].venue.name + "\r\n");
        console.log ("Venue Location: " + response.data[0].venue.city + "\r\n");
        console.log("Date of the event: " + moment(response.data[0].datetime).format("MM-DD-YYYY h:mm a") + "\r\n");
  
        
        var logConcert = "\n=========== Begin concert-this log entry ==========" + "\r\n" + "\nName of the musician: " + artist + "\r\n" + "\nName of the venue: " + response.data[0].venue.name +  "\r\n" + "\nVenue Location: " + response.data[0].venue.city + "\r\n" + "\nDate of the event: " + moment(response.data[0].datetime).format("MM-DD-YYYY h:mm a") + "\r\n" + "\n============ End concert-this log entry ============" + "\r\n";
  
        fs.appendFile("log.txt", logConcert, function (err) {
          if (err) throw err;
        });
      });
  };

  function getRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        return console.log(error);
      } else {
        console.log(data);
  
        var randomData = data.split(",");
        liriBot(randomData[0], randomData[1]);
      }
    });
  };
  
  


liriBot(request, userInput)
