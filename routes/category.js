const CategoryController = require("../controllers/category");
const authorization = require("../middlewares/auhtorization");

const categoryRouter = require("express"). Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getOne);

categoryRouter.use(authorization)

categoryRouter.post("/", CategoryController.post);
categoryRouter.put("/:id", CategoryController.update);

module.exports = categoryRouter;
