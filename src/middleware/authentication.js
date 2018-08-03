module.exports = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash('error', 'please log in first');
            res.redirect('/signin');
        }
    }
}

