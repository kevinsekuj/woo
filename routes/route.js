const express = require("express");
const router = express.Router();
const Site = require("../models/sites");
const catchAsync = require("../utilities/asyncError");
const validate = require("../utilities/validate");

// CRUD for sites

router.get(
	"/",
	catchAsync(async (req, res, next) => {
		const sites = await Site.find({});
		res.render("sites/index", { sites });
	})
);

router.get("/add", (req, res) => {
	res.render("sites/add");
});

router.post(
	"/",
	validate,
	catchAsync(async (req, res) => {
		const newSite = new Site(req.body.site);
		await newSite.save();
		res.redirect(`/sites/${newSite._id}`);
	})
);

router.get(
	"/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const site = await Site.findById(id).populate("reviews");

		res.render("sites/site", { site });
	})
);

router.get(
	"/:id/edit",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const site = await Site.findById(id);
		res.render("sites/edit", { site });
	})
);

router.put(
	"/:id",
	validate,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Site.findByIdAndUpdate(id, { ...req.body.site });
		res.redirect(`/sites/${id}`);
	})
);

router.delete(
	"/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Site.findByIdAndDelete(id);
		res.redirect("/sites/");
	})
);
//

module.exports = router;
