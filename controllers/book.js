const Book = require("../models/book")

class BookController {

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

    static async post(req,res,next) {
        const {id} = req.params
        const {name} = req.body
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next) {
        const {id} = req.params
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next) {
        const {id} = req.params
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookController