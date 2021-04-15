const express = require("express");
const router = express.Router();
const Site = require("../models/sites");
const catchAsync = require("../utilities/asyncError");
const validate = require("../utilities/validate");
const isLoggedIn = require("../middleware.js");

// CRUD for sites

router.get(
	"/",
	catchAsync(async (req, res, next) => {
		const sites = await Site.find({});
		res.render("sites/index", { sites });
	})
);

router.get("/add", isLoggedIn, (req, res) => {
	res.render("sites/add");
});

router.post(
	"/",
	isLoggedIn,
	validate,
	catchAsync(async (req, res) => {
		const newSite = new Site(req.body.site);
		await newSite.save();
		req.flash("success", "Success! Site created");
		res.redirect(`/sites/${newSite._id}`);
	})
);

router.get(
	"/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const site = await Site.findById(id).populate("reviews");
		if (!site) {
			req.flash("error", "Sorry, this site doesn't exist.");
			res.redirect("/sites");
		}
		res.render("sites/site", { site });
	})
);

router.get(
	"/:id/edit",
	isLoggedIn,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const site = await Site.findById(id);
		if (!site) {
			req.flash("error", "Sorry, this site doesn't exist.");
			res.redirect("/sites");
		}
		res.render("sites/edit", { site });
	})
);

router.put(
	"/:id",
	isLoggedIn,
	validate,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Site.findByIdAndUpdate(id, { ...req.body.site });
		if (!site) {
			req.flash("error", "Sorry, this site doesn't exist.");
			res.redirect("/sites");
		}
		req.flash("success", "Successfully updated tourist site!");
		res.redirect(`/sites/${id}`);
	})
);

router.delete(
	"/:id",
	isLoggedIn,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Site.findByIdAndDelete(id);
		req.flash("success", "Successfully deleted tourist site!");
		res.redirect("/sites/");
	})
);
//

module.exports = router;
