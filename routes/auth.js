const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/asyncError");
const passport = require("passport");
const auth = require("../controllers/authController");

// todo add navbar links for reg/login/logout

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
