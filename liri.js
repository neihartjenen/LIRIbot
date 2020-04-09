require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
const fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2]
var keyword = process.argv[3]

function searchBands() {
  log()
  if (command === "concert-this") {
    var artist =  keyword
    console.log("You will be seeing... " + artist + ":")
    
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        for (let index = 0; index < response.data.length; index++) {
          console.log("Name of the venue: " + response.data[index].venue.name);
          console.log("Location of Concert: " + response.data[index].venue.city);
          console.log("Date of the Concert: " + moment(response.data[index].datetime).format("MM/DD/YYYY"));
        }
        console.log("__________________________________________________")
      });

  } else if (command === "spotify-this-song") {
    var query = keyword;
    if (query === undefined) {
      query = "The Sign";
    };

    console.log(" ")
    console.log("**********One moment While we find your song**********")
    
    
    function spotifySong(value) {
        if(!value){
            value = "The Sign";
        }
        spotify
        .search({ type: 'track', query: value })
        .then(function(response) {
            for (var i = 0; i < 5; i++) {
                var spotifyResults = 
                "--------------------------------------------------------------------" +
                "\nArtist: " + response.tracks.items[i].artists[0].name + 
                "\nSong Name: " + response.tracks.items[i].name +
                "\nCover Name: " + response.tracks.items[i].cover.name +
                "\nSample Link: " + response.tracks.items[i].sample_url;
                
        console.log(spotifyResults);
    }
})
.catch(function(err) {
    console.log(err);
});
}

function movieThis(value) {
    if(!value){
        value = "Mr Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
};
fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(error)
    };
    
    var textArr = data.split(",");
        userCommand = textArr[0];
        userInput = textArr[1];
        runLiri();
    })
}