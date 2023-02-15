const userRouter = require("express"). Router();

userRouter.get("/",(req,res)=> {
    res.status("get todos")
});
userRouter.post("/",(req,res)=> {
    res.status("post todos")
});
userRouter.put("/:todoId",(req,res)=> {
    res.status("put todos")
});
userRouter.patch("/:todoId",(req,res)=> {
    res.status("patch todos")
});
userRouter.delete("/:todoId",(req,res)=> {
    res.status("delete todos")
});

module.exports = userRouter;
