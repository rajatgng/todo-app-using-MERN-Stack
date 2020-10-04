import {NextFunction, Request, Response} from 'express';
import {HTTPStatusCode} from "../types";

class CustomError extends Error {
    public readonly message: string;
    public readonly statusCode: HTTPStatusCode;

    constructor(statusCode: HTTPStatusCode,message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.message = message;
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }


}
export const ErrorHandler = (statusCode: HTTPStatusCode,message: string) => new CustomError(statusCode, message);


export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const { statusCode = 500, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}

