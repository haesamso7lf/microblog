const express = require('express');
const router = express.Router();

const controller = require('./../controller/comment');
const middleware = require('./../middleware/authentication');

router.route('/')
	.post(middleware.isLoggedIn, controller.createCommment)

router.route('/:id')
	.get(controller.showComment)
	.put(middleware.isLoggedIn, controller.updateComment)
	.delete(middleware.isLoggedIn, controller.destroyComment)

//get comments by post
//not restful api!
router.route('/post/:id')
	.get(controller.indexComments)

module.exports = router;