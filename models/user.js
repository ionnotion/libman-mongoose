const mongoose = require("mongoose");
const {default : validator} = require("validator");
const { hashPassword } = require("../helpers/bcrypt");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is Required"],
        min: [4, "Username must be longer than 4 characters"],
        max: [16, "Username must be less than 16 character"],
        validate : [validator.isAlphanumeric, "Username is Required"],
        unique: true,
	},
	email: {
		type: String,
		required: [true, "Email is Required"],
        validate : [validator.isEmail, "Invalid Email"],
        unique: true

	},
	password: {
		type: String,
		required: [true, "Password is Required"],
        validate : [validator.isAscii, "Password is Required"],

	},
	firstName: {
		type: String,
		required: [true, "First Name is Required"],
        validate : [validator.isAlpha, "First Name is Required"],
	},
	lastName: {
		type: String,
		required: [true, "Last Name is Required"],
        validate : [validator.isAlpha, "Last Name is Required"],
	},
    isAdmin : {
        type: Boolean,
        default : false
    }
});

const User = mongoose.model("User", UserSchema);

UserSchema.pre("save", async function (next) {
    let {password} = this
    password = hashPassword(password)
    console.log(password)
    next()
})

module.exports = User;
