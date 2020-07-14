var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_demo_2", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => 
		  console.log('DB Connected!')
	)
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
	});

var Post = require("./models/post");
var User = require("./models/user");


// Dummy data
// User.create({
// 	email: "hello@edu.org",
// 	name: "Its Me"
// });


// Post.create({
// 	title:"To tell you am sorry",
// 	content: "for breaking your heart"
// }, function(err, post){
// 	User.findOne({email:"hello@edu.org"}, function(err, foundUser){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			foundUser.posts.push(post);
// 			foundUser.save(function(err,data){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					console.log(data);
// 				}
// 			})
// 		}
// 	});
// });

// Find user and find all their posts (find user and populate posts atrribute and execute both commands)
User.findOne({email:"hello@edu.org"}).populate("posts").exec(function(err,user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});