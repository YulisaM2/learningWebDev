var express = require('express');
var app = express();

const axios = require('axios');

app.set("view engine", "ejs");

app.get("/",function(req,res){
	res.render("home");
});

app.get('/results', function(req,res){
	var query = req.query.search;
	axios.get(`http://omdbapi.com/?s=${query}&apikey=thewdb`)
	.then(function(response){
		// res.send(response.data["Search"][0]["Title"]);
		res.render('results',{data: response.data});
	})
	.catch(function(error){
		console.log(error);
	})
});

app.listen(3000, function(){
	console.log("Listening to port 3000");
})