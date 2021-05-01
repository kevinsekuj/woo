const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const touristSiteSchema = new Schema({
	name: String,
	price: Number,
	description: String,
	location: String,
	images: [
		{
			url: String,
			filename: String,
		},
	],
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review",
		},
	],
});

// mongoose query middleware to clean up orphaned reviews after site is deleted
touristSiteSchema.post("findOneAndDelete", async function (document) {
	if (document) {
		// delete all reviews where those review ids are {$in} the returned
		// document's reviews array
		await Review.deleteMany({
			_id: {
				$in: document.reviews,
			},
		});
	}
});

module.exports = mongoose.model("Site", touristSiteSchema);
