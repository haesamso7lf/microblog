const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema( {
	content: {
		type: String,
		minlength: 1,
		trim: true,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
		required: true
	},
	child: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}
	],
	upvote: {
		type: Number,
		default: 0
	},
	downvote: {
		type: Number,
		default: 0
	}
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {Comment};