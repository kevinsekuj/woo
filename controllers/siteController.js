const Site = require("../models/sites");

module.exports.index = async (req, res) => {
	const sites = await Site.find({});
	res.render("sites/index", { sites });
};

module.exports.addPage = (req, res) => {
	res.render("sites/add");
};

module.exports.create = async (req, res) => {
	const newSite = new Site(req.body.site);
	newSite.author = req.user._id;

	await newSite.save();
	req.flash("success", "Success! Site created");
	res.redirect(`/sites/${newSite._id}`);
};

module.exports.displaySite = async (req, res) => {
	const { id } = req.params;
	const site = await Site.findById(id)
		// populate reviews for site's review array, then populate
		// authors for that reviews, along with separately populating
		// the author of this submission in particular
		.populate({
			path: "reviews",
			populate: {
				path: "author",
			},
		})
		.populate("author");
	// passing author ref to get username info
	if (!site) {
		req.flash("error", "Sorry, this site doesn't exist.");
		res.redirect("/sites");
	}
	res.render("sites/site", { site });
};

module.exports.editForm = async (req, res) => {
	const { id } = req.params;
	const site = await Site.findByIdAndUpdate(id, { ...req.body.site });

	if (!site) {
		req.flash("error", "Sorry, this site doesn't exist.");
		res.redirect("/sites");
	}
	res.render("sites/edit", { site });
};

module.exports.editSite = async (req, res) => {
	const { id } = req.params;

	const site = await Site.findByIdAndUpdate(id, { ...req.body.site });

	if (!site) {
		req.flash("error", "Sorry, this site doesn't exist.");
		res.redirect("/sites");
	}
	req.flash("success", "Successfully updated tourist site!");
	res.redirect(`/sites/${id}`);
};

module.exports.deleteSite = async (req, res) => {
	const { id } = req.params;
	await Site.findByIdAndDelete(id);
	req.flash("success", "Successfully deleted tourist site!");
	res.redirect("/sites/");
};
