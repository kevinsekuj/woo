const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/asyncError");
const reviews = require("../controllers/reviewController");
const { validateReview, isLoggedIn } = require("../utilities/middleware");

// routes for review CRUD

router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete("/:reviewid", isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;
