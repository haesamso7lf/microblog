const express = require('express');
const router = express.Router();

const userController = require('./../controller/user');
const categoryController = require('./../controller/category');
const postController = require('./../controller/post');
const commentController = require('./../controller/comment');

const middleware = require('./../middleware/api');

/*
todo
taking care of the naming of the controller variable, you know
create does not work;
capitalize the routes to be restful routes!
image posting does not work anymore
*/

router.use(middleware.isApi);

router.route('/')
	.get((req, res) => res.send("welcome to mySpace API page"))
//users
router.route('/users')
	.get(userController.indexUsers)
//categories
router.route('/categories')
	.get(categoryController.indexCategories)

router.route('/categories/:id')
	.get(categoryController.showCategory)
	.put(categoryController.updateCategory)
	.delete(categoryController.destroyCategory)

//posts	
router.route('/posts')
	.get(postController.indexPosts)
	
router.route('/posts/:id')
	.get(postController.showPost)
	.put(postController.updatePost)
	.delete(postController.destroyPost)

//comment
//get comments by post
//not restful api!!!!
router.route('/comments/post/:id')
	.get(commentController.indexComments)

router.route('/comments/:id')
	.get(commentController.showComment)
	.put(commentController.updateComment)
	.delete(commentController.destroyComment)

module.exports = router;
