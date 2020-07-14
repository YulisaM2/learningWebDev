// ==================== CAMPGROUND RESTful ROUTES ====================
var express = require('express'),
	router = express.Router();

var Campground = require('../models/campground'),
	Comment = require('../models/comment');

// Index.js is required by default when requiring a directory
var middleware = require('../middleware')

// Enabling geocoder for campground's location
var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// Index route - Show all the campgrounds
router.get("/", function(req,res){
// 	If searching for a campground
	var noMatch;
	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Campground.find({name: regex}, function(err,campgrounds){
			if(err){
				console.log(err);
			}else{
				if(!campgrounds || campgrounds.length < 1){
					noMatch = "No campgrounds match that query, please try again!"
				}
				res.render("campgrounds/index",{campgrounds: campgrounds, page: 'campgrounds', noMatch: noMatch});
			}
		});
	}else{
	// 	Getting campgrounds from db
		Campground.find({}, function(err,campgrounds){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/index",{campgrounds: campgrounds, page: 'campgrounds', noMatch: noMatch});
			}
		});
	}
});


// New route - show form to create new campground
// Important to check that user is logged in
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

// Create route - add new campground
// Important to check that user is logged in
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
//   Try and locate the place introduced by the user
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = {
		name: name, 
		image: image, 
		description: desc,
		price: price,
		author: author,
		location: location,
		lat: lat, 
		lng: lng
	};
	  
    // Create a new campground
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
  });
});

// Show route - show info from one particular campground
router.get('/:id',function(req,res){
// 	Find campground using id, and populate its comments attribute with db data
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// Edit campground (only the user that created the campground can edit it)
router.get('/:id/edit', middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: req.campground});
	});
});

// Update campground (only the user that created the campground can edit it)
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
// 	Check if location entered exists
  geocoder.geocode(req.body.campground.location, function (err, data) {
    if (err || !data.length) {
		console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully updated campground");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

// Delete campground (only the user that created the campground can delete it)
router.delete('/:id',middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err){
			res.redirect('/campgrounds');
		}else{
			Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, function(err){
				if (err) {
					console.log(err);
				}else{
					res.redirect("/campgrounds");
				}
			});
		}
	});
});

// Regex for search queries of campgrounds
function escapeRegex(text){
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}


module.exports = router;