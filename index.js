const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const sites = require("./routes/sites");

const methodOverride = require("method-override");
const reviews = require("./routes/reviews");
const expressError = require("./utilities/error");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const users = require("./routes/auth");

mongoose.connect("mongodb://localhost/sites", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

mongoose.connection.on(
	"error",
	console.error.bind(console, "Connection error:")
);
mongoose.connection.once("open", () => {
	console.log("db connected");
});

// init ejs for dynamic templating
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// method override middleware for put/delete requests
app.use(methodOverride("_method"));

// init passport middleware for user auth and session
app.use(
	session({
		secret: "aaa", // todo actual secret
		resave: false,
		saveUninitialized: true,
		cookie: {
			expires: Date.now() + 604800000,
			maxAge: 604800000, // expire in 1wk
			httpOnly: true, // protect against XSS
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// serialize users into session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// serve views folder and static files
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join((__dirname, "public"))));

// init flash middleware to store/display session msgs, and session
app.use(flash());

// middleware to access (global) locals in templates
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// shorthand for express router
app.use("/sites", sites);
app.use("/sites/:id/reviews", reviews);
app.use("/", users);

// routes
app.listen("3000", (req, res) => {
	console.log("Listening on port 3000");
});

app.get("/home", (req, res) => {
	res.render("home");
});

app.all("*", (req, res, next) => {
	next(new expressError("Page not found.", 404));
});

app.use((err, req, res, next) => {
	if (!err.message) err.message = "Uh oh, something went wrong";
	if (!err.status) err.status = "Site validation error.";
	res.render("error", { err });
});
