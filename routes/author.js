const AuthorController = require("../controllers/author");

const authorRouter = require("express").Router();

authorRouter.get("/", AuthorController.getAll);
authorRouter.post("/", AuthorController.post);

authorRouter.put("/:id", AuthorController.update);
authorRouter.get("/:id", AuthorController.getOne);

module.exports = authorRouter;
