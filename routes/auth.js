const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

const catchAsync = require("../utilities/asyncError");
const passport = require("passport");
/**
 * Routes for user registration/login/authentication
 */

router
    .route("/register")
    .get(auth.displayRegistration)
    .post(catchAsync(auth.register));

router
    .route("/login")
    .get(auth.displayLogin)
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        auth.login
    );

router.get("/logout", auth.logout);

module.exports = router;
