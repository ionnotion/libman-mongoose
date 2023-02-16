const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	checkoutDate: {
		type: Date,
		required: true,
	},
	dueDate: {
		type: Date,
	},
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);

module.exports = Checkout;
