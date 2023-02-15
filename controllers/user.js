const User = require("../models/user");
const bcrypt = require("bcrypt")
class UserController {
	static async register(req, res, next) {
		const { username, email, password, firstName, lastName } = req.body;
        const {isAdmin} = req?.user
        isAdmin ? isAdmin : isAdmin = false
		try {
            const newUser = new User({username,email,password,firstName,lastName,isAdmin})
            await newUser.save()

            let returning = {
                username : newUser.username,
                email : newUser.email
            }

            res.status(200).json({returning})
		} catch (error) {
			next(error);
		}
	}

	static async login(req, res, next) {
        const {username, password} = req.body
		try {
            const foundUser = User.findOne({username})

            res.status(200).json({foundUser})
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
