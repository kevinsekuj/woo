const Site = require("../models/sites");
const siteSchema = require("../utilities/schemas");
const reviewSchema = require("../utilities/reviewSchema");
const Review = require("../models/review");
const expressError = require("./error");

// login with express session
module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You need to be signed in for this action.");
		return res.redirect("/login");
	}
	// if authenticated, call next()
	next();
};

// validation middleware for server side validation

// client side validation with forms and server side
// validation with joi and expresserror handling
// validate requests with joi before saving with mongoose

// catch and destructure errors from request body, pass to error handler
// middleware

module.exports.validate = (req, res, next) => {
	const { error } = siteSchema.validate(req.body);
	if (error) {
		throw new expressError(
			error.details[0].message,
			400 + " - Bad request"
		);
	} else {
		next();
	}
};

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		throw new expressError(
			error.details[0].message,
			400 + " - Bad request"
		);
	} else {
		next();
	}
};

// user authorization for viewing and reviews
module.exports.authorize = async (req, res, next) => {
	const { id } = req.params;
	const site = await Site.findById(id);
	console.log(site);

	if (!site.author.equals(req.user._id)) {
		req.flash("error", "You don't have permission to view this page.");
		return res.redirect(`/sites/${id}`);
	}
	next();
};

module.exports.reviewAuthor = async (req, res, next) => {
	const { reviewid } = req.params;
	const review = await Review.findById(reviewid);

	console.log(req.params);
	if (!review.author.equals(req.user._id)) {
		req.flash("error", "You don't have permission for this action.");
		return res.redirect(`/sites/${id}`);
	}
	next();
};
