const _ = require("lodash");

const {User} = require('./../models/user');
const {Category} = require('./../models/category');
const {Post} = require('./../models/post');
const {Comment} = require('./../models/comment');

const {ObjectID} = require('mongodb');

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
	destination: function(req, file, cb) {
		cb(null, './public/uploads/categories');
	}
});

const upload = multer({storage}).fields([
	{name: 'cover'},
	{name: 'image'}
]);

module.exports = {
	indexCategories: function (req, res) {
		User.find({}).then((users) => {
			Category.find({})
				.populate('admin')
				.populate('subscription')
				.exec((err, categories) => {
					if (err) {
						console.log(err);
					}
					req.isApi ? res.json(categories) : res.render('category/category.ejs', {categories});
				});
		})
	},

	createCategory: function (req, res) {
		upload(req, res, (err) => {
			if(err) {
				console.log(err);
			}
			var category = new Category({
				name: req.body.name,
				description: req.body.description,
				admin: req.user._id,
				subscription: req.user._id,
			});
			
			try {
				category.cover = req.files.cover[0].filename;
				category.image = req.files.image[0].filename;
			} catch (err) {
				console.log("req.files undefined", err);
			}

			category.save().then(() => console.log('New Category'));
			console.log(req.body);
			res.redirect('back');
		});
	},

	showCategory: function (req, res) {
		var id = req.params.id;
		Category.findById(id)
		.then((category) => {
			if(!category) {
				console.log(err);
			}
			Category.find({}).then((categories) => {
				User.find({}).then((user) => {
					Comment.find({}).then((comments) => {
						Post.find({category: category._id})
						.populate('user')
						.populate('category')
						.populate('comment')
						.exec((err, posts) => {			
							Post.count({category: category._id}).then((c) => {
								console.log('count is ' + c);
								req.isApi ? res.json(category) : res.render('category/showCategory.ejs', {category, posts, comments: []});
							});
						});								
					});
				});
			});		
		});
	},

	updateCategory: function (req, res) {
		upload(req, res, (err) => {
			var id = req.params.id;
			var category = _.pick(req.body, ["name", "description"])
			
			try {
				category.cover = req.files.cover[0].filename;
			} catch(err) {
				console.log("req.files.cover[0].filename is undefined", err)
			}

			try{
				category.image = req.files.image[0].filename;
			} catch(err){
				console.log("req.files.image[0].filename is undefined", err)
			}

			if(!ObjectID.isValid(id)) {
				return res.status(404).send();
			}
			Category.findByIdAndUpdate(id, category).then((category) => {
				if(!category) {
					return res.status(404).send();
				}
				res.redirect('back')
			}).catch((e) => {
				return res.status(404).send();
			});
		});
	},

	updateCategoryWithUser: function (req, res) {
		var id = req.params.id;
		if(!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		Category.findById(id)
		.then((category) => {
			if(!category) {
				return res.status(404).send();
			}
			category.subscription.addToSet(req.body.userID);
			category.save();
			res.redirect('back')
		})
		.catch((e) => {
			return res.status(404).send();
		});
	},

	destroyCategory: function (req, res) {
		var id = req.params.id;
		if(!ObjectID.isValid(id)) {
			res.status(404).send();
		}
		Category.findByIdAndRemove(id).then((category) => {
			if(!category) {
				return res.status(404).send();
				res.redirect('/');
			}
			console.log('Removed');
			res.redirect('back');
		})
	}
}
