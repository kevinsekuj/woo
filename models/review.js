const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteReviewSchema = new Schema({
	body: String,
	rating: Number,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User", // ref to author via User instance
	},
});

module.exports = mongoose.model("Review", siteReviewSchema);
