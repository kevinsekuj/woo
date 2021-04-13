const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteReviewSchema = new Schema({
	body: String,
	rating: Number,
});

module.exports = mongoose.model("Review", siteReviewSchema);
