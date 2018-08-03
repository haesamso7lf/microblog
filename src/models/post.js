const mongoose = require('mongoose');

const PostSchema = mongoose.Schema( {
	title: {
		type: String,
		//required: true,
		minlength: 5,
		trim: true
	},
	content: {
		type: String,
		//required: true
	},
	tag: {
		type: String,
		//required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	image: {
		type: String,
		default: "default.jpg"
	},
	date: {
		type: Date,
		default: Date.now
	},
	latitude: Number,
	longitude: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	upvote: {
		type: Number,
		default: 0
	},
	downvote: {
		type: Number,
		default: 0
	},
	comment: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}
	]
});

const Post = mongoose.model('Post', PostSchema);
module.exports = {Post};