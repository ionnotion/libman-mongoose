const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author",
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		amount: {
			type: Number,
		},
		borrowedBy: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		}],
	},
	{
		virtuals: {
			available: {
				get() {
					return Number(this.amount) - Number(this.borrowedBy.length);
				},
			},
		},
	}
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
