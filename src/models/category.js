const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		trim: true
	},
	description: {
		type: String,
		required: true,
		minlength: 5,
		trim: true
	},
	image: {
		type: String,
		default: "image.png"
	},
	cover:{
		type: String, 
		default: "cover.png"
	},
	admin:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User' 
		}
	],
	subscription:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {Category}