// Setup Express
var express = require("express");
var app = express();

// Route definitions
app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animal",function(req,res){
	var animal = req.params.animal.toLowerCase();
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof"
	}
	var sound = sounds[animal];
	res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:word/:num",function(req,res){
	var word = req.params.word;
	var num = Number(req.params.num);
	
	var message = "";
	for(var i = 0; i < num; ++i){
		message += word + " ";
	}
	res.send(message);
});

app.get("*",function(req,res){
	res.send("Sorry, page not found ... What are you doing with your life?")
});

// Listener for env.port
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});