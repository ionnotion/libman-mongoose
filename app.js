const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const rootRouter = require("./routes/index");
const mongooseConnect = require("./config/mongoose");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongooseConnect().then(() => {
	app.use("/", rootRouter);

	app.listen(port, () => {
		console.log(`App listening on port:`, port);
	});
});
