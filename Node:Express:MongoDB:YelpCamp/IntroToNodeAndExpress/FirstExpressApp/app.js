var express = require("express");
var app = express();

// Exercise
// when using / print Hi there!
app.get("/",function(req,res){
	res.send("Hi there!");
});
// when using /bye print Goodbye!
app.get("/bye", function(req,res){
	res.send("Goodbye!");
});
// when using /dog print Woof!
app.get("/dog", function(req,res){
	res.send("Woof!");
	console.log("Request made to /dog");
});

// Using path params (defined with : before var name)
app.get("/r/:subrreditName/comments/:id/:title", function(req,res){
	var subrredit = req.params.subrreditName;
	var title = req.params.title;
	res.send("Welcome to the " + subrredit + "'s comments page of " + title);
});

// Route for everything else (must be after other gets, because order of routes matters)
app.get("*",function(req,res){
	res.send("Error 404: Page not found");
});

// Defining which port should be listened 
// Params are env.Port env.IP and callback function
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});