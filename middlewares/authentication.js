const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

const authentication = async (req, res, next) => {
	try {
		let { authorization : access_token } = req.headers;

        if(access_token) {
            access_token = access_token.split(" ")[1]
    
            const payload = verifyToken(access_token);
            // console.log(payload)
            const foundUser = await User.findById(payload.id);
            req.user = {
                user_id : foundUser._id,
                loggedUsername : foundUser.username,
                isAdmin : foundUser.isAdmin
            };
            // console.log(req.user.user_id)
        }
        // console.log(access_token)
		next();
	} catch (error) {
		next(error);
	}

};

module.exports = authentication;