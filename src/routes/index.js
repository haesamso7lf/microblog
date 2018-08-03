const express = require('express');
const router = express.Router();

const controller = require('./../controller/post');
const middleware = require('./../middleware/api')
router.route('/')
	.get(controller.indexPosts)
	.post(controller.indexSortPosts)

module.exports = router;

