const User = require("../models/user")

class UserController {

    static async register(req,res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async login(req,res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req,res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req,res,next) {
        const {id} = req.params
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController