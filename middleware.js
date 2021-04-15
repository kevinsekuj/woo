const isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You need to be signed in for this action.");
		return res.redirect("/login");
	}
	// if authenticated, call next()
	next();
};

module.exports = isLoggedIn;
