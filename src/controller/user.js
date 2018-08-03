const {User} = require('./../models/user');
const {Category} = require('./../models/category');
const {Post} = require('./../models/post');
const {Comment} = require('./../models/comment');
const {ObjectID} = require('mongodb');

const passport = require('passport');

const _ = require('lodash');
const bcrypt = require('bcryptjs');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads/avatar')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + new Date().toISOString() + path.extname(file.originalname))
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}
const upload = multer({
	storage,
	limits: {
	fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
}).fields([
	{name: 'avatar'},
	{name: 'cover'}
]);


module.exports = {
	indexUsers: function  (req, res) {
		User.find({}).then((users) => {
			req.isApi ? res.json(users) : res.render('user/members.ejs', {users});
		});
	},

	newUser: function (req, res) {
		res.render('user/signup.ejs')
	},

	createUser: function  (req, res) {
		upload(req, res, (err) => {
			if(err) {
				console.log(err)
			}
			var user = {
				username: req.body.username,
				name: req.body.name,
				email: req.body.email,
				birthday: req.body.birthday,
				sex: req.body.sex,
				password: req.body.password,
			}

			try {
				user.avatar = req.files.avatar[0].filename;
			} catch(err) {
				console.log("req.files.avatar[0].filename is undefined", err);
			}

			try {
				user.cover = req.files.cover[0].filename;
			} catch(err) {
				console.log(" req.files.cover[0].filename is undefined", err);
			}
			
			var newUser = new User(user);
			

			User.register(newUser, req.body.password, (err, user) => {
				if (err) {
					res.send(err);
				} else {
					passport.authenticate('local')(req, res, () =>{
						req.flash('success', 'Welcome, ' + user.username);
						res.redirect('/');
					});
				}
			});
		});
	},
	
	destroyUser: function (req, res) {
		var id = req.params.id;
		if(!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		User.findByIdAndRemove(id).then((user) => {
			if(!user) {
				res.status(404).send();
			}
			res.redirect('/');
		});
	},


	/*****not restful *****/

	showSignIn: function (req, res) {
		res.render('user/signin.ejs');
	},

	/*
	router.post('/signin', (req, res)=> {
		var name = req.body.name;
		var password = req.body.password;
		User.findOne({name}).then((user) => {		
			if(!user) {
				res.send('no user');	
			}
			bcrypt.compare(password, user.password, function(err, result) {
				if (result === true) {
					req.session.userId = user._id;
					res.send(req.session.userId);
				} else {
					res.send('password wrong');
				}
			});
		});
	});
	*/
	signIn: passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/signin',
	failureFlash: true
	}),

	logOut: function(req, res) {
	req.logout();
	req.flash('success', 'You have successfully logged out.');
	res.redirect('/');
	},


	showUserPosts: function  (req, res)  {
		var id = req.params.id;
		Category.find({}).then((categories) => {
			User.find({}).then((user) => {
				Comment.find({}).then((comment) => {
					Post.find({user: req.params.id})
					.populate('user')
					.populate('category')
					.populate('comment')
					.exec((err, posts) => {			
						res.render('user/posts.ejs', {posts, categories, comments: [], id});
					});							
				});
			});
		});
	},

	showUserComments: function (req, res) {
		var id = req.params.id;
		Comment.find({user: id}).then((comments) => {
			res.render('user/comments.ejs',{comments, id});
		});
	},

	showUserCategorties: function (req, res) {
		var id = req.params.id;
		Category.find({admin: id}).then((categories) => {
			res.render('user/categories.ejs',{categories, id});
		});
	},

	showUserAbout: function (req, res)  {
		var id = req.params.id;
		User.findById(id).then((user) => {
			res.render('user/about.ejs', {user, id});
		});
	},

	updateUserAbout: function (req, res) {
		var id = req.params.id;
		var user = req.body;
		if(!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		User.findByIdAndUpdate(id, user).then((user) => {
			if(!user) {
				res.status(404).send();
			}
			res.redirect('back');
		});
	}
}