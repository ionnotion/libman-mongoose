const CategoryController = require("../controllers/category");

const categoryRouter = require("express"). Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.post("/", CategoryController.post);

categoryRouter.put("/:id", CategoryController.update);
categoryRouter.get("/:id", CategoryController.getOne);

module.exports = categoryRouter;
