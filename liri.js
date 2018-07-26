require("dotenv").config();

// Packages and Modules
var spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

var spotify = new spotify(keys.spotify);

// Store all of the arguments in an array
var nodeArgs = process.argv;
var pick = process.argv[2];

// Create an empty variable for holding the input
var inputText = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

    if ((i > 3) && (i < nodeArgs.length)) {

        inputText = inputText + "+" + nodeArgs[i];

    } else {

        inputText += nodeArgs[i];

    }
}

// The switch statement is used to perform different actions based on different conditions.
// Using the switch statement to select one of many code blocks to be executed.

switch (pick) {

    case "spotify-this-song":

        if (inputText) {

            music(inputText);

        } else {
            music("Psycho")

        };

        break;

    case "movie-this":

        if (inputText) {

            omdb(inputText);

        } else {

            omdb("Deadpool")

        };

        break;

    case "do-what-it-says":

        fakeSiri();

        break;

};

// Spotify function
function music(song) {

    spotify.search({
        type: "track",
        query: song
    }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songdata = data.tracks.items[i];
                console.log("____________________________");
                console.log("Track Name: " + songdata.name);
                console.log("Artist: " + songdata.artists[0].name);
                console.log("Album: " + songdata.album.name);
                console.log("URL: " + songdata.preview_url);
                console.log("____________________________");

                // Bonus adding to log.txt

                log("____________________________");
                log("Track Name: " + songdata.name);
                log("Artist: " + songdata.artists[0].name);
                log("Album: " + songdata.album.name);
                log("URL: " + songdata.preview_url);
                log("____________________________");
            }

        } else {
            console.log("Spotify ERROR 404")
        }
    });
}

// OMDB Movie function
function omdb(movieName) {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            console.log("____________________________");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("____________________________");

            // Bonus adding movies to log.txt
            log("____________________________");
            log("Title: " + JSON.parse(body).Title);
            log("Release Year: " + JSON.parse(body).Year);
            log("IMDB Rating: " + JSON.parse(body).imdbRating);
            log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            log("Country of Production: " + JSON.parse(body).Country);
            log("Language: " + JSON.parse(body).Language);
            log("Plot: " + JSON.parse(body).Plot);
            log("Actors: " + JSON.parse(body).Actors);
            log("____________________________");
        } else {
            console.log("OMDB ERROR 404");
        }

        if (movieName === "Deadpool") {
            console.log("Time to make the chimi-*******-changas!");

            log("Time to make the chimi-*******-changas!");
        }

    });
}

// False SIRI function "Do what it says"
// function fakeSiri() {

function fakeSiri() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        // DO NOT PUT SPACES AROUND COMMA: random.txt has no spaces
        var txt = data.split(',');
        music(txt[1]);
    });
}

// Log function
function log(logging) {
    fs.appendFile("log.txt", logging, function (error) {
        if (error) {
            throw error;
        }
    });
}

