import {Router} from "express"
import {addTodo, deleteTodo, getTodos, updateTodo} from "../controllers/todo"
import authenticate from "../helper/authenticate";

const todoRouter: Router = Router()

todoRouter.get("/list", authenticate.isAuthorized, getTodos)

todoRouter.post("/add", authenticate.isAuthorized, addTodo)

todoRouter.put("/edit/:id", authenticate.isAuthorized, updateTodo)

todoRouter.delete("/delete/:id", authenticate.isAuthorized, deleteTodo)

export default todoRouter