const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

const authentication = async (req, res, next) => {
	try {
		let { authorization : access_token } = req.headers;

        if(access_token) {
            access_token = access_token.split(" ")[1]
    
            const payload = verifyToken(access_token);
            const foundUser = await User.findById(payload.id);
            req.user = {
                user_id : foundUser._id,
                loggedUsername : foundUser.username,
                isAdmin : foundUser.isAdmin
            };
        }
		next();
	} catch (error) {
		next(error);
	}

};

module.exports = authentication;