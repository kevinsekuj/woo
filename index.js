const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const sites = require("./routes/route");

const methodOverride = require("method-override");
const reviews = require("./routes/reviewRoutes");
const expressError = require("./utilities/error");

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

// initialize templating engine, middleware, static files
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join((__dirname, "public"))));

// configure express session
const sessionCfg = {
	secret: "aaa",
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: Date.now() + 604800000,
		maxAge: 604800000, // expire in 1wk
		httpOnly: true, // protect against XSS
	},
};
// init flash middleware to store/display session msgs, and session
app.use(session(sessionCfg));
app.use(flash());

// middleware to access flash messages in ejs templates

app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// shorthand for express routing
app.use("/sites", sites);
app.use("/sites/:id/reviews", reviews);

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
