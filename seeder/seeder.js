const Author = require("../models/author");
const Category = require("../models/category");
const Book = require("../models/book");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const mongooseConnect = require("../config/mongoose");
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");

async function startSeed() {
	await mongooseConnect();

	await Author.deleteMany({});
	await Category.deleteMany({});
	await Book.deleteMany({});
	await User.deleteMany({});

	const { author, category, user, book } = JSON.parse(
		fs.readFileSync("./seeder/data.json", "utf-8")
	);

	await Author.insertMany(author);
	await Category.insertMany(category);

    user.forEach(el=>{
        el.password = hashPassword(el.password)
    })

	await User.insertMany(user);

	const authors = await Author.find();
	const categories = await Category.find();

	book.forEach((element) => {
		element.author = authors[Math.floor(Math.random() * authors.length)];
		element.category =
			categories[Math.floor(Math.random() * categories.length)];
	});

	await Book.insertMany(book);

	console.log("seed completed!");
	mongoose.disconnect();
}

startSeed();
