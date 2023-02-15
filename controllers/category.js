const Category = require("../models/category")

class CategoryController {

    static async getAll(req,res,next) {
        try {
            const categories = await Category.find()

            res.status(200).json({categories})
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req,res,next) {
        const {id} = req.params
        try {
            const category = await Category.findById(id)

            res.status(200).json({category})
        } catch (error) {
            next(error)
        }
    }

    static async post(req,res,next) {
        const {name} = req.body
        try {
            const newCategory = new Category({name})
            await newCategory.save()

            res.status(201).json({newCategory})
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next) {
        const {id} = req.params
        const {name} = req.body
        try {
            const updatedCategory = await Category.findByIdAndUpdate(id,{name})

            res.status(200).json({updatedCategory})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CategoryController