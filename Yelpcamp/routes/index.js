// =============== Authentication Routes ===============
var express = require('express'),
	router = express.Router();

var passport = require('passport'),
	User = require('../models/user'),
	Campground = require('../models/campground');

// For password reset
// var async = require("async");
// var nodemailer = require("nodemailer");
// var crypto = require("crypto");

router.get("/", function(req,res){
	res.render("landing");
});

// Show register form
router.get('/register', function(req,res){
	res.render('register', {page: 'register'});
});
// Sign up logic
router.post('/register',function(req,res){
	var newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		avatar: req.body.avatar
	});
	User.register(newUser, req.body.password, function(err,user){
// 		Check if it's admin (this is only for practice, must use hash for security purposes)
		if(req.body.adminCode === process.env.SECRET){
			user.isAdmin = true;
			user.save();
		}
		if(err){
			console.log(err);
			req.flash('error', err.message);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req,res,function(){
			req.flash('success', 'Welcome to YelpCamp, ' + user.username + '!');
			res.redirect('/campgrounds');
		});
	});
});

// Show login form
router.get('/login', function(req,res){
	res.render('login',{page: 'login'});
});
// Login logic
router.post('/login', passport.authenticate('local',
	{
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}), function(req,res){	
});
// Logout route
router.get('/logout', function(req,res){
	req.logout();
	req.flash('success', 'Successfully logged you out');
	res.redirect('/campgrounds');
});

// forgot password
// router.get('/forgot', function(req, res) {
//   res.render('forgot');
// });

// router.post('/forgot', function(req, res, next) {
//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       User.findOne({ email: req.body.email }, function(err, user) {
//         if (!user) {
//           req.flash('error', 'No account with that email address exists');
//           return res.redirect('/forgot');
//         }

//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//         user.save(function(err) {
//           done(err, token, user);
//         });
//       });
//     },
//     function(token, user, done) {
//       var smtpTransport = nodemailer.createTransport({
//         service: 'Gmail', 
//         auth: {
//           user: process.env.GMAIL,
//           pass: process.env.GMAILPW
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: process.env.GMAIL,
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         console.log('mail sent');
//         req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//         done(err, 'done');
//       });
//     }
//   ], function(err) {
//     if (err) return next(err);
//     res.redirect('/forgot');
//   });
// });

// router.get('/reset/:token', function(req, res) {
//   User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//     if (!user) {
//       req.flash('error', 'Password reset token is invalid or has expired.');
//       return res.redirect('/forgot');
//     }
//     res.render('reset', {token: req.params.token});
//   });
// });

// router.post('/reset/:token', function(req, res) {
//   async.waterfall([
//     function(done) {
//       User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//         if (!user) {
//           req.flash('error', 'Password reset token is invalid or has expired.');
//           return res.redirect('back');
//         }
//         if(req.body.password === req.body.confirm) {
//           user.setPassword(req.body.password, function(err) {
//             user.resetPasswordToken = undefined;
//             user.resetPasswordExpires = undefined;

//             user.save(function(err) {
//               req.logIn(user, function(err) {
//                 done(err, user);
//               });
//             });
//           })
//         } else {
//             req.flash("error", "Passwords do not match.");
//             return res.redirect('back');
//         }
//       });
//     },
//     function(user, done) {
//       var smtpTransport = nodemailer.createTransport({
//         service: 'Gmail', 
//         auth: {
//           user: 'yulisajanefarron@gmail.com',
//           pass: process.env.GMAILPW
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'yulisajanefarron@mail.com',
//         subject: 'Your password has been changed',
//         text: 'Hello,\n\n' +
//           'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         req.flash('success', 'Success! Your password has been changed.');
//         done(err);
//       });
//     }
//   ], function(err) {
//     res.redirect('/campgrounds');
//   });
// });

// User's profile 
router.get('/users/:id', function(req,res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash('error', 'Something went wrong: User not found');
			res.redirect('/campgrounds');
		}else{
// 			Getting all campgrounds created by the user to display them on user profile
			Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
				if(err){
					req.flash('error', 'Something went wrong');
					res.redirect('/campgrounds');
				}else{
					res.render("users/show", {user: foundUser, campgrounds: campgrounds});
				}
			});
		}
	});
});

module.exports = router;