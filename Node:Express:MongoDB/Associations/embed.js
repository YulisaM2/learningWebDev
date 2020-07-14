var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_demo", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => 
		  console.log('DB Connected!')
	)
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
	});


var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);


var userSchema = new mongoose.Schema({
	email: String,
	name: String,
// 	Embedding posts to user
	posts:[postSchema]
})

var User = mongoose.model("User",userSchema);

// Dummy data
// var newUser = new User({
// 	email: "abcd123@hotmail.com",
// 	name: "AbC D123"
// });

// newUser.posts.push({
// 	title: "It's as easy as 123",
// 	content: "Do Re mi A B C"
// })

// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Filler post",
// 	content: "Practicing with moongose and associations"
// })

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });

// Retriving user and adding a new post
User.findOne({
	name: "AbC D123"
}, function(err,user){
	if(err){
		console.log(err);
	}else{
		user.posts.push({
			title: "Second post",
			content: "Sup my dudes"
		});
		user.save(function(err,user){
			if(err){
				console.log(err);
			}else{
				console.log(user);
			}
		});
	}
});
