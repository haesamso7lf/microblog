const express = require('express');
const router = express.Router();

const controller = require('./../controller/post');
const middleware = require('./../middleware/authentication');
router.route('/')
	.post(middleware.isLoggedIn, controller.createPost)
	
router.route('/:id')
	.get(controller.showPost)
	.put(middleware.isLoggedIn, controller.updatePost)
	.delete(middleware.isLoggedIn, controller.destroyPost)
	


module.exports = router;