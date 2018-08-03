const express = require('express');
const router = express.Router();


const controller = require('./../controller/user')
const middleware = require('./../middleware/authentication');


// members
router.route('/members')
	.get(controller.indexUsers);
	
router.route('/signup')
	.get(controller.newUser)
	.post(controller.createUser)



//sign in
router.route('/signin')
	.get(controller.showSignIn)
	.post(controller.signIn)

router.route('/logout')
	.get(controller.logOut)


router.route('/profile/:id')
	.get(controller.showUserPosts)

	//does not work
router.route('/profile/:id/delete')	
	.delete(controller.destroyUser)


router.route('/profile/:id/posts')
	.get(controller.showUserPosts)

router.route('/profile/:id/comments')
	.get(controller.showUserComments)
	
router.route('/profile/:id/categories')
	.get(controller.showUserCategorties)
	
router.route('/profile/:id/about')
	.get(controller.showUserAbout)
	.put(middleware.isLoggedIn, controller.updateUserAbout)




module.exports = router;

