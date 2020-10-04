"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = express_1.Router();
userRouter.post("/login", user_1.login);
userRouter.post("/signup", user_1.signup);
exports.default = userRouter;
