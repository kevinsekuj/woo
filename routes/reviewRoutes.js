const express = require("express");
const router = express.Router({ mergeParams: true });
const Site = require("../models/sites");
const Review = require("../models/review");
const catchAsync = require("../utilities/asyncError");
const validateReview = require("../utilities/validateReview");

// CRUD for reviews

router.post(
	"/",
	validateReview,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const site = await Site.findById(id);

		const review = new Review(req.body.review);
		site.reviews.push(review);

		review.save();
		site.save();
		res.redirect(`/sites/${id}`);
	})
);

router.delete("/:reviewid", async (req, res) => {
	const { id, reviewid } = req.params;

	// pull operator to pull reviews element with matching id
	await Site.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
	await Review.findByIdAndDelete(reviewid);

	res.redirect(`/sites/${id}`);
});

module.exports = router;
