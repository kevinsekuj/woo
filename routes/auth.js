const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utilities/asyncError");
const passport = require("passport");

router.get("/register", (req, res) => {
	res.render("registration");
});

router.post("/register", async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });

		// new User instance with params, hashing & storing pass
		const newUser = await User.register(user, password);

		req.login(newUser, err => {
			if (err) return next(err);
			req.flash("success", "Successful sign-up!");
			res.redirect("/sites");
		});
	} catch (e) {
		// display err and redirect
		req.flash("error", e.message);
		res.redirect("/register");
	}
});

router.get(
	"/login",
	catchAsync(async (req, res) => {
		res.render("login");
	})
);

router.post(
	"/login",
	passport.authenticate("local", {
		failureFlash: true,
		failureRedirect: true,
	}),
	(req, res) => {
		// keep track of user redirect path if exists and delete
		// once cast to a var
		const redirectUrl = req.session.returnTo || "/sites";
		delete req.session.returnTo;

		req.flash("success", "Welcome back!");
		res.redirect(redirectUrl);
	}
);

// todo add navbar links for reg/login/logout

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Successfully logged out.");
	res.redirect("/sites");
});
module.exports = router;
