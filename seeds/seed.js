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
		const price = Math.floor(Math.random() * 30) + 5;
		const init = new Site({
			// must be assigned to a valid user objectid else won't render
			author: "6088cba027756cd75e6a6f86",
			name: `Seeded tourist site ${i}`,
			price: price,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
			location: "Worcester, MA",
			image: "https://source.unsplash.com/collection/3106804",
		});
		await init.save();
	}
};

seed().then(() => {
	mongoose.connection.close();
});
