var express = require('express'),
	app = express(), 
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User = require('./models/user');

// Config
mongoose.connect("mongodb://localhost/auth_demo_app", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => 
		  console.log('DB Connected!')
	)
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
	});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// To enable authentication functionalities with passport
app.use(require('express-session')({
// 	Secret is used to encode and decode the session
	secret: "The answer to life is 42",
	resave: false,
	saveUninitialized: false
	
}));

app.use(passport.initialize());
app.use(passport.session());

// Methods responsible for reading session, taking the encoded data and deserialize it
// Also responsible for encoding the data and putting in the session
// We can call it from User model because of the plugin at the user.js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
app.get('/', function(req,res){
	res.render('home');
});

// isLoggedIn is a middleware that checks if user is logged in or not
app.get('/secret', isLoggedIn, function(req,res){
	res.render('secret');
});


// ==================== Sign up ====================
// Sign up form
app.get('/register', function(req,res){
	
	res.render("register");
});

// Handling user sign up
app.post('/register', function(req,res){
	User.register(new User(
		{
		username: req.body.username
		}
	), req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render('register');
		}
// 		Log user in with local strategy (other strategies include fb, twitter, etc)
		passport.authenticate('local')(req, res, function(){
			res.redirect('/secret');
		});
	});
});

// ==================== Login ====================
app.get('/login',function(req,res){
	res.render('login');
});

// Using passport authenticate as middleware (run before final callback)
app.post('/login', passport.authenticate('local',{
	successRedirect: '/secret',
	failureRedirect: '/login'
}), function(req,res){
	
});

// ==================== Logout ====================
app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});

// Next refers to the callback function in '/secret' route (the next function to be executed)
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
// 	If user is not authenticated, redirect to login (callback won't be called)
	res.redirect('/login');
};

app.listen(3000,function(){
	console.log("Listening to port 3000");
});