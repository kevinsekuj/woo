const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Site = require("./models/sites");
const ejsMate = require("ejs-mate");
const catchAsync = require("./handlers/asyncError");
const expressError = require("./handlers/error");

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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
	morgan(
		":method | :url | status :status | :res[content-length] - | :response-time ms"
	)
);

app.listen("3000", (req, res) => {
	console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
	res.render("home");
});

app.get(
	"/sites",
	catchAsync(async (req, res, next) => {
		const sites = await Site.find({});
		res.render("sites/index", { sites });
	})
);

app.post(
	"/sites",
	catchAsync(async (req, res) => {
		const newSite = new Site(req.body.site);
		await newSite.save();
		res.redirect(`/sites/${newSite._id}`);
	})
);

app.get("/sites/add", (req, res) => {
	res.render("sites/add");
});

app.get(
	"/sites/:id/edit",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const site = await Site.findById(id);
		res.render("sites/edit", { site });
	})
);

app.get(
	"/sites/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const site = await Site.findById(id);
		res.render("sites/site", { site });
	})
);

app.put(
	"/sites/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Site.findByIdAndUpdate(id, { ...req.body.site });
		res.redirect(`/sites/${id}`);
	})
);

app.delete(
	"/sites/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Site.findByIdAndDelete(id);
		res.redirect("/sites/");
	})
);

app.all("*", (req, res, next) => {
	next(new expressError("Page not found.", 404));
});

app.use((err, req, res, next) => {
	if (!err.message) err.message = "Uh oh, something went wrong";
	if (!err.status) err.status = "Site validation error.";
	res.render("error", { err });
});
