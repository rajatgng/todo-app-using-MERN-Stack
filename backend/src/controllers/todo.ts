import {Request, Response,NextFunction} from "express"
import {HTTPStatusCode, ITodo} from "../types"
import Todo from "../models/todo"

const getTodos = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(HTTPStatusCode.OK).json({data: todos});
    } catch (error) {
        next(error);
    }
}

const addTodo = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const body = req.body as ITodo;

        const todo: ITodo = new Todo({
            title: body.title,
            description: body.description,
            status: body.status,
        })

        const newTodo: ITodo = await todo.save()

        res
            .status(HTTPStatusCode.Created)
            .json({message: "Todo added", data: newTodo})
    } catch (error) {
        next(error);
    }
}

const updateTodo = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const {
            params: {id},
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            id,
            body
        )
        res.status(HTTPStatusCode.OK).json({
            message: 'Todo updated',
            data: updateTodo,
        })
    } catch (error) {
        next(error);
    }
}

const deleteTodo = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        res.status(HTTPStatusCode.OK).json({
            message: 'Todo deleted',
            data: deletedTodo,
        })
    } catch (error) {
        next(error);
    }
}

export {getTodos, addTodo, updateTodo, deleteTodo}
