module.exports = {
	isApi: function (req, res, next){
		req.isApi= true;
		next();
	}
}
