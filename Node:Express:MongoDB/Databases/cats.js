var mongoose = require('mongoose');
// Create/connect to local db
mongoose.connect("mongodb://localhost/cat_app", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => 
		  console.log('DB Connected!')
	)
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
	});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// Creating model for obj Cat that follows catSchema
var Cat = mongoose.model("Cat", catSchema);

// Add create and new cat to db

// Method 1.
// var george = new Cat({
// 	name: "Grumpy",
// 	age: 8,
// 	temperament: "Happy"
// });

// george.save(function(err,cat){
// 	if(err){
// 		console.log("Something went wrong ");
// 	}else{
// 		console.log("Cat added to db");
// // 		Printing obj sent from db
// 		console.log(cat);
// 	}
// });

// Method 2.
Cat.create({
	name: "Holly",
	age: 2,
	temperament: "Lazy"
}, function(err, cat){
	if(err){
		console.log("Something went wrong ");
	}else{
		console.log("Cat added to db");
// 		Printing obj sent from db
		console.log(cat);
	}
});

// Retrieve all cats
Cat.find({}, function(err,cats){
	if(err){
		console.log("ERROR: ");
		console.log(err);
	}else{
		console.log("Found: ");
		console.log(cats);
	}
});