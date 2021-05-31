const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviewController");

const catchAsync = require("../utilities/asyncError");
const { validateReview, isLoggedIn } = require("../utilities/middleware");

/**
 * Routes for review creation & deletion with middlewares for validating that
 * user making request is logged in, or author in case of deletion
 */

router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete("/:reviewid", isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;
