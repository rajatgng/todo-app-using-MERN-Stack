"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
exports.ErrorHandler = (statusCode, message) => new CustomError(statusCode, message);
function errorHandler(err, req, res, next) {
    const { statusCode = 500, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}
exports.default = errorHandler;
