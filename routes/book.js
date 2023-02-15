const bookRouter = require("express"). Router();

bookRouter.get("/",(req,res)=> {
    res.status("get todos")
});
bookRouter.post("/",(req,res)=> {
    res.status("post todos")
});
bookRouter.put("/:todoId",(req,res)=> {
    res.status("put todos")
});
bookRouter.patch("/:todoId",(req,res)=> {
    res.status("patch todos")
});
bookRouter.delete("/:todoId",(req,res)=> {
    res.status("delete todos")
});

module.exports = bookRouter;
