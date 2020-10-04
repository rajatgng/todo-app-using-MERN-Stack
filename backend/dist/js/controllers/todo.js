"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200 /* OK */).json({ data: todos });
    }
    catch (error) {
        next(error);
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = new todo_1.default({
            title: body.title,
            description: body.description,
            status: body.status,
        });
        const newTodo = yield todo.save();
        res
            .status(201 /* Created */)
            .json({ message: "Todo added", data: newTodo });
    }
    catch (error) {
        next(error);
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield todo_1.default.findByIdAndUpdate(id, body);
        res.status(200 /* OK */).json({
            message: 'Todo updated',
            data: updateTodo,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        res.status(200 /* OK */).json({
            message: 'Todo deleted',
            data: deletedTodo,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTodo = deleteTodo;
