const User = require("../models/user");

module.exports.displayRegistration = (req, res) => {
    res.render("registration");
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });

        // new User instance with params, hashing & storing pass
        const newUser = await User.register(user, password);

        req.login(newUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Successful sign-up!");
            res.redirect("/sites");
        });
    } catch (e) {
        // flash err and redirect on invalid registration
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

module.exports.displayLogin = (req, res) => {
    res.render("login");
};

module.exports.login = (req, res) => {
    // Redirect user to page they were viewing on login
    req.flash("success", "Welcome back!");

    const redirectUrl = req.session.returnTo || "/sites";
    delete req.session.returnTo;

    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out.");
    res.redirect("/sites");
};
