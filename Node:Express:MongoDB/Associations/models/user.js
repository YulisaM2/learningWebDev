var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
// 	Referecing posts from user
	posts:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});

module.exports = mongoose.model("User",userSchema);
