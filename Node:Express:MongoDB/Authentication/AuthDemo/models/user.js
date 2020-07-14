var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	password: String	
});

// Adding the passportLocalMongoose methods to our schema (for authentication)
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);