const authorization = (req, res, next) => {
    const {isAdmin} = req.user
    if(!isAdmin) {
        next({name:"FORBIDDEN"})
    } else {
        next()
    }
};

module.exports = authorization;
