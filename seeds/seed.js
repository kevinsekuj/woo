const mongoose = require("mongoose");
const Site = require("../models/sites");

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

const seed = async () => {
	// clear db and seed with starter entry, close connection on seed
	await Site.deleteMany({});
	for (let i = 0; i < 10; i++) {
		const init = new Site({
			name: `Seeded tourist site ${i}`,
			price: 25,
			description: "A tourist site",
			location: "Worcester, MA",
		});
		await init.save();
	}
};

seed().then(() => {
	mongoose.connection.close();
});
