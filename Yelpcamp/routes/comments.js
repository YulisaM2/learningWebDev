// ==================== COMMENTS ROUTES ====================
var express = require('express'),
// 	So that we can access the campground's id 
	router = express.Router({mergeParams: true});

var Campground = require('../models/campground'),
	Comment = require('../models/comment');

// Index.js is required by default when requiring a directory
var middleware = require('../middleware')

// Form to fill for new comment
// Important to check if user is logged in 
router.get('/new', middleware.isLoggedIn, function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	});
	
});
// To add new comment to db
// Important to check if user is logged in 
router.post('/',middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		}else{
// 			Create new comment and connect it to campground
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
// 					Add username and id to comment and then save it
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
// 					Add comment to user
					campground.comments.push(comment);
					campground.save();
					req.flash('success', 'Successfully created comment');
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// Edit comment
router.get('/:comment_id/edit',middleware.isLoggedIn, middleware.checkCommentOwnership, function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect('back');
		}else{
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// Update comment
router.put('/:comment_id', middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
		if(err){
			res.redirect('back');
		}else{
			// req.flash('error', 'Successfully updated comment');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// Delete comment
router.delete('/:comment_id', middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect('back');
		}else{
			req.flash('success', 'Successfully deleted comment');
			res.redirect('/campgrounds/' + req.params.id);
		}
	})
});

module.exports = router;
