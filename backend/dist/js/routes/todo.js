"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_1 = require("../controllers/todo");
const authenticate_1 = __importDefault(require("../helper/authenticate"));
const todoRouter = express_1.Router();
todoRouter.get("/list", authenticate_1.default.isAuthorized, todo_1.getTodos);
todoRouter.post("/add", authenticate_1.default.isAuthorized, todo_1.addTodo);
todoRouter.put("/edit/:id", authenticate_1.default.isAuthorized, todo_1.updateTodo);
todoRouter.delete("/delete/:id", authenticate_1.default.isAuthorized, todo_1.deleteTodo);
exports.default = todoRouter;
