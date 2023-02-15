const mongoose = require("mongoose");
const bcrypt =require("bcrypt")

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is Required"],
        unique: true
	},
	email: {
		type: String,
		required: [true, "Email is Required"],
        unique: true

	},
	password: {
		type: String,
		required: [true, "Password is Required"],
	},
	firstName: {
		type: String,
		required: [true, "First Name is Required"],
	},
	lastName: {
		type: String,
		required: [true, "Last Name is Required"],
	},
});

const Author = mongoose.model("Author", AuthorSchema);

UserSchema.pre("save", async function (next) {
    let {password} = this
    password = bcrypt.hashSync(password)
    next()
})

module.exports = Author;
