const Book = require("../models/book");
const Checkout = require("../models/checkout");
const User = require("../models/user");

class BookController {
	static async getAll(req, res, next) {
		try {
			let books = await Book.find().populate(["author", "category"]);

			res.status(200).json(books);
		} catch (error) {
			console.log(error)
			next(error);
		}
	}

	static async getOne(req, res, next) {
		const { id } = req.params;
		try {
			const book = await Book.findById(id).populate([
				"author",
				"category",
				"checkouts",
			]);

			res.status(200).json(book);
		} catch (error) {
			next(error);
		}
	}

	static async post(req, res, next) {
		const {
			title,
			author,
			summary,
			category,
			amount,
		} = req.body;
		try {
			const newBook = new Book({title, author, summary, category, amount});

			await newBook.save();

			res.status(201).json(newBook);
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		const { id } = req.params;
		const {
			title,
			author,
			summary,
			category,
			amount,
		} = req.body;
		try {
			const foundBook = await Book.findById(id).populate("borrowedBy");
			if (amount < foundBook.available) {
				throw { name: "BAD_REQUEST", message: "Invalid book amount" };
			}
			const updatedBook = await Book.findByIdAndUpdate(id, {
				title,
				author,
				summary,
				category,
				amount,
			});

			res.status(200).json(updatedBook);
		} catch (error) {
			next(error);
		}
	}

	static async checkout(req, res, next) {
		const { id } = req.params;
		const { id: user_id } = req.body;
		try {
            const foundUser =  await User.findById(user_id)

            if(!foundUser) {
                throw {name:"USER_NOT_FOUND", message: "User not found..."}
            }
            
			const foundBook = await Book.findById(id).populate("checkouts");

            if(!foundBook) {
                throw {name:"BOOK_NOT_FOUND", message: "Book not found..."}
            }

			let checkoutDate = new Date()
			let dueDate = new Date().setDate(checkoutDate.getDate() + 7)
			
			let newCheckout = new Checkout({username:foundUser.username, user : foundUser._id, checkoutDate, dueDate })
			await newCheckout.save()

            await Book.findByIdAndUpdate(id,{checkouts : [...foundBook.checkouts, newCheckout ]})
            
            const updatedBook = await Book.findById(id)

            res.status(200).json(updatedBook)
		} catch (error) {
			next(error);
		}
	}

	static async return(req, res, next) {
		const { id } = req.params;
		const { id: checkout_id } = req.body;
		try {            
            const foundBook = await Book.findById(id).populate("checkouts");

            if(!foundBook) {
                throw {name:"BOOK_NOT_FOUND", message: "Book not found..."}
            }

            await Book.findByIdAndUpdate(id,{checkouts : [...foundBook.checkouts.filter(e => e._id != checkout_id)]})

            const updatedBook = await Book.findById(id)

            res.status(200).json(updatedBook)
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		const { id } = req.params;
		try {
            await Book.deleteOne({id})

            res.status(200).json({message: "Delete Book successful"})
		} catch (error) {
			next(error);
		}
	}
}

module.exports = BookController;
