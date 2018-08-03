const _ = require('lodash');


const {User} = require('./../models/user');
const {Post} = require('./../models/post');
const {Comment} = require('./../models/comment');
const {Category} = require('./../models/category');

const {ObjectID} = require('mongodb'); //note mongodb

module.exports = {
	//get comments by post
	indexComments: function (req, res) {
		var id = req.params.id;
		if (!ObjectID.isValid(id)) {
			res.status(404).send();
		}
		Comment.find({post: id}).then((comments) => {
			res.json(comments);
			console.log(comments);
		});
	},

	createCommment: function (req, res) {
		var body = _.pick(req.body, ['content', 'post', 'child']);
		body.user = req.user._id;
		var comment = new Comment(body);
		comment.save().then((comment) => console.log(`New Comment ${comment}`));
		Post.findById(body.post).then((post) => {
			post.comment.push(comment);
			post.save();
		});
		res.redirect('back');
	},

	//doesn't work
	//add template here!
	showComment: function (req, res) {
		var id = req.params.id;
		if(!ObjectID.isValid(id)) {
			res.status(404).send();
		}
		Comment.findById(id).then((comment) => {
			req.isApi ? res.json(comment) : res.send(`<h1>${comment}</h1>`)
		}).catch((e) => {
			return res.status(404).send()
		})
		console.log(id);
	},

	updateComment: function (req, res) {
		var id = req.params.id;
		var comment = req.body;
		if(!ObjectID.isValid(id)) {
			res.status(404).send();
		}
		Comment.findByIdAndUpdate(id, comment).then((comment) => {
			if(!comment) {
				res.status(404).send();
			}
			res.redirect('back');
		}).catch((e) => {
			return res.status(404).send();
		});
	},

	destroyComment: function (req, res) {
		var id = req.params.id;
		if(!ObjectID.isValid(id)) {
			res.status(404).send();
		}
		Comment.findByIdAndRemove(id).then((comment) => {
			if(!comment) {
				return res.status(404).send();
				res.redirect('/');
			}
			console.log('Removed');
			res.redirect('back');
		});
	}

}