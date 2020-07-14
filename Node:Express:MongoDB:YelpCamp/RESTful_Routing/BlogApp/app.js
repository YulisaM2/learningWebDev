var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer');

// App config
mongoose.connect("mongodb://localhost/restful_blog_app", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => 
		  console.log('DB Connected!')
	)
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
	});

// Mongoose model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {
		type: Date,
		default: Date.now
	}
});

var Blog = mongoose.model("Blog", blogSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// Looks for "_method" on files
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(expressSanitizer());

// Dummy data for db
// Blog.create({
// 	title: "Testing Blog App",
// 	image: "https://images.pexels.com/photos/934062/pexels-photo-934062.jpeg?auto=compress&cs=tinysrgb&h=350",
// 	body: "Hey, there! This is a dummy post to test the db and the server's connection"
// }, function(err,blog){
// 	if(err){
// 		console.log("Error!");
// 		console.log(err);
// 	}else{
// 		console.log(blog);
// 	}
// });

// RESTful Routes
app.get("/", function(req,res){
	res.redirect("/blogs");
});

// Index Route - show all the blogs
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index",{blogs: blogs});
		}
	})
});

// New Route - form to submit new blog
app.get("/blogs/new",function(req,res){
	res.render("new");
});

// Create Route - post blog info to db
app.post("/blogs", function(req,res){
// 	SANITIZING BEFORE CREATING ON DB
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	})
});

// Show route - show more information from selected blog
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show",{blog: foundBlog});
		}
	});
});

// Edit route - show form to edit blog
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
});

// Update route - put new blog info into db
app.put("/blogs/:id",function(req,res){
	// 	SANITIZING BEFORE UPDATING ON DB
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// Destroy route - delete a blog
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err,){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
});

app.listen(3000,function(){
	console.log("Listening to port 3000");
});