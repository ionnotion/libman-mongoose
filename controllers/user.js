const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { default: validator } = require("validator");
class UserController {
	static async register(req, res, next) {
		let { username, email, password, firstName, lastName } = req.body;
		let { isAdmin } = req?.user;
		isAdmin ? isAdmin : (isAdmin = false);
		try {
			password = hashPassword(password);
			const newUser = new User({
				username,
				email,
				password,
				firstName,
				lastName,
				isAdmin,
			});
			await newUser.save();

			let returning = {
				username: newUser.username,
				email: newUser.email,
			};

			res.status(200).json(returning);
		} catch (error) {
			next(error);
		}
	}

	static async login(req, res, next) {
		const { credential, password } = req.body;
		try {
			console.log(req.body);
			let foundUser;

			if (validator.isEmail(credential)) {
				foundUser = await User.findOne({ email: credential });
			}

			if (!foundUser) {
				foundUser = await User.findOne({ username: credential });
			}

			if (!foundUser) {
				throw {
					name: "BAD_REQUEST",
					message: "Invalid Username / Email or Password",
				};
			}

			if (!comparePassword(password, foundUser.password)) {
				throw {
					name: "BAD_REQUEST",
					message: "Invalid Username / Email or Password",
				};
			}

			const payload = { id: foundUser._id };

			const access_token = signToken(payload);

			console.log(foundUser)

			res.status(200).json({ username: foundUser.username, access_token, isAdmin: foundUser.isAdmin });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
