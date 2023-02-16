const { Router } = require("express");
const AuthorController = require("../controllers/author");
const authorization = require("../middlewares/auhtorization");

const authorRouter = require("express").Router();

authorRouter.get("/", AuthorController.getAll);
authorRouter.get("/:id", AuthorController.getOne);

authorRouter.use(authorization)

authorRouter.post("/", AuthorController.post);
authorRouter.put("/:id", AuthorController.update);

module.exports = authorRouter;
