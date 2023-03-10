const errorHandler = (error, req, res, next) => {
	console.log(error,"<<<<<<<<<<<<<<<<")
	let code;
	let message;

	switch (error.name) {
		case `MongoServerError`:
			// case `SequelizeUniqueConstraintError`:
			code = 400;
			message = `${Object.keys(error.keyValue).join(" ,")} is already taken.`;
			break;
		// case `BAD_TRANSACTION_REQUEST`:
		case `BAD_REQUEST`:
		case `ValidationError`:
		case `CastError`:
			code = 400;
			message = error.message;
			break;
		case `Unauthorized`:
			code = 401;
			message = "Invalid token";
			break;
		case `JsonWebTokenError`:
			code = 401;
			message = "Invalid token";
			break;
		case `Invalid Email or Password`:
			code = 401;
			message = "Invalid Email or password!";
			break;
		case `FORBIDDEN`:
			code = 403;
			message = "Forbidden";
			break;
		case `Not Found`:
		case `USER_NOT_FOUND`:
		case `BOOK_NOT_FOUND`:
			code = 404;
			message = "Data not found";
			break;
		default:
			code = 500;
			message = "Internal Server Error!";
			break;
	}
	res.status(code).json({ message });
};

module.exports = errorHandler;
