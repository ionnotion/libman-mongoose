const { Router } = require("express");

const rootRouter = Router();
// const userRouter = require("./UserRoutes")
const bookRouter = require("./BookRoutes")


rootRouter.get("/", (_,res)=> {
    res.send("This is a simple todo server")
})


// rootRouter.use("/user",userRouter);
rootRouter.use("/book",bookRouter);

module.exports = rootRouter;
