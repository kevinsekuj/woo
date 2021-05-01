const Site = require("../models/sites");
const { cloudinary } = require("../utilities/cloudinary");

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
	// map over array from req.files object created by multer and create of array of objects
	// containing image file path and filename, adding them onto new Site creation
	newSite.images = req.files.map(file => ({
		url: file.path,
		filename: file.filename,
	}));

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

	const images = req.files.map(file => ({
		url: file.path,
		filename: file.filename,
	}));

	// push spread array elements to images array of Site object
	site.images.push(...images);
	await site.save();

	// if deleteImages in request, pull from images array all images
	// where filename in deleteImages array (from ejs form)
	if (req.body.deleteImages) {
		const { deleteImages } = req.body;

		await site.updateOne({
			$pull: { images: { filename: { $in: deleteImages } } },
		});

		// iterate through to-be deleted elements of deleteImages array and
		// to delete assets from Cloudinary storage
		for (let filename of deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
	}

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
