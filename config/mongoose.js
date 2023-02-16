const mongoose = require("mongoose");

async function mongooseConnect() {
	require("dotenv").config();

	let localhost =
		"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
	const url = process.env.ATLAS_URL || localhost;
	const options = {
		dbName: `LibManDB`,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	mongoose.set("strictQuery", true);

	mongoose.connect(url, options).then(() => {

		let connection = process.env.ATLAS_URL ? "cloud" : "localhost";
		console.log(`Connected to mongoose! (${connection})`);
	});
}

module.exports = mongooseConnect;
