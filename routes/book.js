const BookController = require("../controllers/book");
const authorization = require("../middlewares/authorization");

const bookRouter = require("express"). Router();

bookRouter.get("/",BookController.getAll);
bookRouter.get("/:id",BookController.getOne);

bookRouter.use(authorization)

bookRouter.post("/",BookController.post);

bookRouter.put("/:id",BookController.update);

bookRouter.patch("/checkout/:id",BookController.checkout);
bookRouter.patch("/return/:id",BookController.return);

bookRouter.delete("/:id",BookController.delete);

module.exports = bookRouter;
