const _ = require('lodash');

const MarkdownIt = require('markdown-it');

const {User} = require('./../models/user');
const {Category} = require('./../models/category');
const {Post} = require('./../models/post');
const {Comment} = require('./../models/comment');

const {ObjectID} = require('mongodb'); //note mongodb
const path = require('path');
const multer = require('multer');

//Set Storage Engine
const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

//Init Upload
const upload = multer({
	storage: storage,
	limits: {fileSize: 1000000}
	/*
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	}
	*/
}).single('image');

// Check File Type
/*
function checkFileType(file, cb){
	// Allowed ext
	const filetypes = '/jpeg|jpg|png|gif';
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
	
	if(mimetype && extname){
		return cb(null, true);
	} else {
		cb('Error: Image Only!');
	}
}
*/

module.exports = {
	indexPosts: function  (req, res) {
		User.find({}).then((user) => {
			Category.find({}).then((categories) => {
				Comment.find({}).then((comment) => {
					Post.find({})
					.populate('user')
					.populate('category')
					.populate('comment')
					.sort({date: 'ascending'})
					.exec((err, posts) => {
						if (err) {
							console.log(err);
						}					
						req.isApi ? res.json (posts) : res.render('index.ejs', {posts, categories, comments: []});
						console.log(posts);
					});				
				});
			});
		});
		console.log(req.body);
	},


	// there's a problem. plus it must be merge with indexPosts 
	indexSortPosts: function (req, res) {
		User.find({}).then((user) => {
			Category.find({}).then((categories) => {
				Post.find({})
				.populate('category')
				.populate('user')
				.sort({date: req.body.sort})
				.exec((err, posts) => {
					if (err) {
						console.log(err);
					}
					res.render('index.ejs', {posts, categories});
				});
			});
		});
		console.log(req.body.sort);
		
	},


	createPost: function (req, res) {
		md = new MarkdownIt();
		upload(req, res, (err) => {
			if(err) {
				console.log(err);
			}
			var body = _.pick(req.body, ['title', 'category', 'content', 'tag', 'date', 'latitude', 'longitude']);
			body.user = req.user._id;
			try {
				body.image = req.file.filename;
			} catch (err) {
				console.log("req.file.filename is undefined", err)
			}
			var post = new Post (body);
			post.save().then((post) => console.log(`New Post \n ${req.file} ${post}`));
			res.redirect('back');

		});		
	},


	showPost: function (req, res) {
		var id = req.params.id;
		if(!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		User.find().then((user) => {
			Category.find({}).then((categories) => {	
				Post.findById(id)
				.populate('category')
				.populate('user')
				.exec((err, post) => {
					if (!post) {
						return res.status(404).send();
					}
					Comment.find({post: id}).then((comments) => {
						req.isApi ? res.json(post) : res.render('post/post.ejs', {post, comments});
					});
				});
			});
		});
	},


	destroyPost: function (req, res) {
		var id = req.params.id;
		if(!ObjectID.isValid(id)) {
			return res.status(404).send();
			console.log('not valid id');
		}
		Post.findByIdAndRemove(id).then((post) => {
			if(!post) {
				return res.status(404).send();
			}
			res.redirect('back');
		}).catch((e) => {
			res.status(400).send();
		});
	},


	updatePost: function (req, res) {
		var id = req.params.id;
		
		var post = req.body;
		
		if(!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		Post.findByIdAndUpdate(id, post).then((post) => {
			if(!post) {
				return res.status(404).send();
			}
			res.redirect('back');
		}).catch((e) => {
			res.status(404).send();
		});
	}
}
