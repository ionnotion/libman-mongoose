const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt")
class UserController {
	static async register(req, res, next) {
		let { username, email, password, firstName, lastName } = req.body;
        let {isAdmin} = req?.user
        isAdmin ? isAdmin : isAdmin = false
		try {
            password = hashPassword(password)
            const newUser = new User({username,email,password,firstName,lastName,isAdmin})
            await newUser.save()

            let returning = {
                username : newUser.username,
                email : newUser.email
            }

            res.status(200).json(returning)
		} catch (error) {
			next(error);
		}
	}

	static async login(req, res, next) {
        const {username, password} = req.body
		try {
            const foundUser = await User.findOne({username})

            console.log(foundUser, "<<<<<")

            if(!foundUser) {
                throw {name: "BAD_REQUEST", message : "Invalid Username or Password"}
            }

            if(!comparePassword(password,foundUser.password)) {
                throw {name: "BAD_REQUEST", message : "Invalid Username or Password"}
            }

            const payload = {id : foundUser._id}

            const access_token = signToken(payload)

            res.status(200).json({username : foundUser.username, access_token})
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
