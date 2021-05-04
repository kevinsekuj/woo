const Site = require("../models/sites");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
	const { id } = req.params;
	const site = await Site.findById(id);

	const review = new Review(req.body.review);
	review.author = req.user._id;

	site.reviews.push(review);

	// store review reference in sites array
	review.save();
	site.save();

	req.flash("success", "Successfully added review!");
	res.redirect(`/sites/${id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, reviewid } = req.params;

	// pull operator to pull reviews element with matching id
	await Site.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
	await Review.findByIdAndDelete(reviewid);

	res.redirect(`/sites/${id}`);
};
