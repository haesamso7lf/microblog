const express = require('express');
const router = express.Router();
const {User} = require('./../models/user');
const {Category} = require('./../models/category');
const {Post} = require('./../models/post');
const {Comment} = require('./../models/comment');
const {ObjectID} = require('mongodb');




router.get('/', (req, res) => {
	res.render('upload/upload.ejs');
});


module.exports = router;

