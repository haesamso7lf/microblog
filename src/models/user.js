const mongoose = require('mongoose');
//const validator = require('validator'); //what is this?
//const jwt = require('jsonwebtoken');
const _ = require('lodash');

const bcyrpt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		minlength: 3,
		trim: true
	},
	name: {
		type: String,
		unique: true,
		required: true,
		minlength: 3,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 6,
		trim: true,
		/*validate: {
			validator: validator.isEmail,
			message: '{VALIE} is not a valid email'
		}*/
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	birthday : {
		type: Date,
		required: true
	},
	sex: {
		type: String,
		required: true
	},
	registered_in: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default:"male.jpg"
	},
	cover: {
		type: String,
		default:"cover.jpg"
	}
});

// problem with arrow function! watch out!
/*UserSchema.pre('save', function (next) {
	var user = this;
	bcyrpt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});*/

/*UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
	
	return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	user.tokens.push({access, token});
	
	return user.save().then(() => {
		return token;
	})
}

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;
	
	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		
	}
	
	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
}
*/

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = {User};