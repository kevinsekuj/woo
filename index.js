const express = require("express");
const app = express();
const path = require("path");
const Site = require("./models/sites");
const mongoose = require("mongoose");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen("3000", (req, res) => {
	console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/sites", async (req, res) => {
	const sites = await Site.find({});
	res.render("sites/index", { sites });
});
