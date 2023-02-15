const Author = require("../models/author")

class AuthorController {

    static async getAll(req,res,next) {
        try {
            const authors = await Author.find()

            res.status(200).json({authors})
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req,res,next) {
        const {id} = req.params
        try {
            const author = await Author.findById(id)

            res.status(200).json({author})
        } catch (error) {
            next(error)
        }
    }

    static async post(req,res,next) {
        const {name} = req.body
        try {
            const newAuthor = new Author({name})
            await newAuthor.save()

            res.status(201).json({newAuthor})
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next) {
        const {id} = req.params
        const {name} = req.body
        try {
            const updatedAuthor = await Author.findByIdAndUpdate(id,{name})

            res.status(200).json({updatedAuthor})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthorController