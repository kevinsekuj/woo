const express = require("express");
const router = express.Router();
const sites = require("../controllers/siteController");

const catchAsync = require("../utilities/asyncError");
const { isLoggedIn, authorize, validate } = require("../utilities/middleware");

const multer = require("multer");
const upload = multer({ storage });

const { storage } = require("../utilities/cloudinary");

/**
 * Routes for tourist location CRUD, with middlewares for user auth
 * and validation as well as multer multi-image upload & cloudinary
 * for cloud image storage
 */

router
    .route("/")
    .get(catchAsync(sites.index))
    .post(
        isLoggedIn,
        upload.array("image"),
        validate,
        catchAsync(sites.create)
    );

router.get("/add", isLoggedIn, sites.addPage);

router
    .route("/:id")
    .get(catchAsync(sites.displaySite))
    .put(
        isLoggedIn,
        authorize,
        upload.array("image"),
        validate,
        catchAsync(sites.editSite)
    )
    .delete(isLoggedIn, authorize, catchAsync(sites.deleteSite));

router.get("/:id/edit", isLoggedIn, authorize, catchAsync(sites.editForm));

module.exports = router;
