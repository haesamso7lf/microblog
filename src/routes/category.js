const express = require('express');
const router = express.Router();


const controller = require('./../controller/category');
const middleware = require('./../middleware/authentication');


router.route('/')
	.get(controller.indexCategories)
	.post(middleware.isLoggedIn, controller.createCategory)

router.route('/:id')
	.get(controller.showCategory)
	.put(middleware.isLoggedIn, controller.updateCategory)
	.delete(middleware.isLoggedIn, controller.destroyCategory)
	
router.route('/:id/subscribe')
	.put(middleware.isLoggedIn, controller.updateCategoryWithUser)


module.exports = router;