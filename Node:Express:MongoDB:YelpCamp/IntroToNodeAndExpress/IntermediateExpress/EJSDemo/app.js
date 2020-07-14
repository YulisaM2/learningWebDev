var express = require("express");
var app = express();

// Indicating that we want to serve the public folder (for css resources)
app.use(express.static("public"));

// Indicating that we will be using ejs files (so that we don't have to add .ejs when rendering)
app.set("view engine", "ejs");

app.get("/", function(req,res){
	// res.send("<h1>Welcome to the home page!</h1><h2>Testing render...</h2>");
	res.render("home");
});

app.get("/fallinlovewith/:thing",function(req,res){
	var thing = req.params.thing;
// 	Passing info so that it can be used on the ejs file
	res.render("love", {thingVar: thing});
});

app.get("/posts", function(req,res){
	var posts = [
		{title: "Post 1", author: "Yulisa"},
		{title: "Post 2", author: "Trinity"},
		{title: "Post 3", author: "Zyuka"},
	];	
	
	res.render("posts",{posts: posts});
});

app.listen(3000, function(){
	console.log('Server listening to port 3000'); 
});