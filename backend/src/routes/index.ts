import {Router} from "express"
import todoRouter from "./todo";
import userRouter from "./user";

const router: Router = Router()

router.use('/todo',todoRouter);
router.use('/user',userRouter);
export default router