const authorization = (req, res, next) => {

    console.log(req.user)

    if(!req.user) {
        return next({name:"FORBIDDEN"})
    }
    
    const {isAdmin} = req.user
    if(!isAdmin) {
        next({name:"FORBIDDEN"})
    } else {
        next()
    }
};

module.exports = authorization;
