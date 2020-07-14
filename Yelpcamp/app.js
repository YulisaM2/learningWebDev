// For enviroment variable (geolocation Google API)
require('dotenv').config();

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'), 
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	seedDB = require('./seeds'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	User = require('./models/user'),
	methodOverride = require('method-override'),
	flash = require('connect-flash');

// Requiring routes 
var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// Flash declaration must come before passport's
app.use(flash());

// Making moment available through all templates (for registering time since post and such)
app.locals.moment = require('moment');

// Passport config
app.use(require('express-session')({
	secret: "could hash bruh",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create/connect to local db
mongoose.connect(process.env.DATABASEURL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
})
	.then(() => 
		  console.log('DB Connected!')
	)
	.catch(err => {
	console.log(`DB Connection Error: ${err.message}`);
	});

// Seeding db with dummy data
// seedDB();

// Making current user and flash accesible through all the templates
// MUST BE DECLARED BEFORE ROUTES (here)
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// Prefix + routes call
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

// Other pages are errors
app.get('/*', function(req,res){
	res.send('Error 404: Page not found');
	// res.redirect('back');
});

app.listen(process.env.PORT, function(){
	console.log("Listening to port 3000");
});