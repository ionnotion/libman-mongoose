const rootRouter = require("express").Router();

const userRouter = require("./user")
const bookRouter = require("./book")
const authorRouter = require("./author")
const categoryRouter = require("./category");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

rootRouter.get("/", (_,res)=> {
    res.send("This is LibMan")
})

rootRouter.use(authentication)

rootRouter.use("/user",userRouter);
rootRouter.use("/book",bookRouter);
rootRouter.use("/author",authorRouter);
rootRouter.use("/category",categoryRouter);

rootRouter.use(errorHandler)

module.exports = rootRouter;
