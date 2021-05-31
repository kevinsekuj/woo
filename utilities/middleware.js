const Site = require("../models/sites");
const siteSchema = require("../utilities/schemas");
const reviewSchema = require("../utilities/reviewSchema");
const Review = require("../models/review");
const expressError = require("./error");

/**
 * Verify user logged in with session on pages that require login such as
 * adding/editing a location
 * @returns Login view if user not logged in
 */
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You need to be signed in for this action.");
        return res.redirect("/login");
    }
    // continue if authenticated
    next();
};

/**
 * Validation middleware for server-side requests using express joi
 * @throws expressError instance with err details
 */
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

/**
 * Validate server side requests for review routes using express joi
 * @throws expressError instance with err details
 */
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

/**
 *  Validate that user attempting to edit a location is the author of
 *  that location
 * @returns template for particular location
 */
module.exports.authorize = async (req, res, next) => {
    const { id } = req.params;
    const site = await Site.findById(id);

    if (!site.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to view this page.");
        return res.redirect(`/sites/${id}`);
    }

    next();
};

/**
 * Validate user trying to delete review is author of that review
 * @returns template for particular location
 */
module.exports.reviewAuthor = async (req, res, next) => {
    const { reviewid } = req.params;
    const review = await Review.findById(reviewid);

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission for this action.");
        return res.redirect(`/sites/${id}`);
    }
    next();
};
