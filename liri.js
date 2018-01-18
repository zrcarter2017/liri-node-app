require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');
var fs = require('fs');
var command = process.argv[2];
var searchString = process.argv.slice(3).join(" ");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (command === 'my-tweets') {
 console.log("tweets");
 var params = {screen_name: 'zacharycarterr'};
 client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < 20; i++) {
    console.log(tweets[i].text + " " + tweets[i].created_at);
	}
  }
});
}

else if (command === 'spotify-this-song') {
	console.log("spotify");
	spotify.search({ type: 'track', query: searchString }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
 	
console.log(data); 
// make default song
});
}

else if (command === 'movie-this') {
	console.log("movie-this");
	var movieTitle = searchString;
	request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie's year is: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's rotten tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
    console.log("The movie's country is: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
  }
  // make default movie
});
}

else if (command === 'do-what-it-says') {
	console.log("do something");
	// include fs logic
	fs.readFile('random.txt', 'utf8', function (err, data) {
		if (err) throw err;
  		console.log(data);
	})
}

else {
	console.log("That is not a command. Please try again.");
}