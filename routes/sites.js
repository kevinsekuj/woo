const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/asyncError");
const { isLoggedIn, authorize, validate } = require("../utilities/middleware");
const sites = require("../controllers/siteController");

// CRUD for sites w/ controllers to separate route requests

router
	.route("/")
	.get(catchAsync(sites.index))
	.post(isLoggedIn, validate, catchAsync(sites.create));

router.get("/add", isLoggedIn, sites.addPage);

router
	.route("/:id")
	.get(catchAsync(sites.displaySite))
	.put(isLoggedIn, authorize, validate, catchAsync(sites.editSite))
	.delete(isLoggedIn, authorize, catchAsync(sites.deleteSite));

router.get("/:id/edit", isLoggedIn, authorize, catchAsync(sites.editForm));

module.exports = router;
