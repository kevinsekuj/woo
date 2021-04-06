const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const touristSiteSchema = new Schema({
	name: String,
	price: Number,
	description: String,
	location: String,
});

module.exports = mongoose.model("Site", touristSiteSchema);