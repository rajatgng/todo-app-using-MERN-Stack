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
exports.login = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const authenticate_1 = __importDefault(require("../helper/authenticate"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_handler_1 = require("../helper/error-handler");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    user_1.default.findOne({ email }, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(err);
        try {
            if (user) {
                if (bcryptjs_1.default.compareSync(password, user.password)) {
                    const token = authenticate_1.default.getToken({ id: user.id });
                    res.status(200).json({ success: true, status: 'Login Successful!', token, user });
                }
                else {
                    throw error_handler_1.ErrorHandler(401 /* Unauthorized */, "Invalid Password");
                    // res.status(400).json({message: 'Invalid Password'});
                }
            }
            else {
                // res.status(400).json({message: 'User not exist'});
                throw error_handler_1.ErrorHandler(404 /* NotFound */, "User not exist");
            }
        }
        catch (e) {
            next(e);
        }
    }));
});
exports.login = login;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    user_1.default.findOne({ email }, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(err);
        try {
            if (!user) {
                const hash = bcryptjs_1.default.hashSync(password, 10);
                const newUser = yield user_1.default.create({ email, password: hash });
                res.status(200).json({ success: true, status: 'Registration Successful!', user: newUser });
            }
            else {
                // res.status(400).json({message: 'User already exist'});
                throw error_handler_1.ErrorHandler(409 /* Conflict */, "User already exist");
            }
        }
        catch (e) {
            next(e);
        }
    }));
});
exports.signup = signup;
