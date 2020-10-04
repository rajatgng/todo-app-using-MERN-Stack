import {NextFunction, Request, Response, Router} from "express"
import authenticate from "../helper/authenticate";
import {login, signup} from "../controllers/user";

const userRouter: Router = Router()

userRouter.post("/login", login);

userRouter.post("/signup", signup)


export default userRouter