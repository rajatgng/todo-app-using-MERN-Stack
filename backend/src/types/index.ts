import {Document} from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description: string;
    status: boolean;
}

export interface IUser extends Document {
    email: string;
    isAdmin?: boolean;
    password: string;
}

export const enum HTTPStatusCode {
    OK = 200,
    Created = 201,
    Accepted = 202,

    Found = 302,


    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    Conflict = 409,
    UnsupportedMediaType = 415,

    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,

}
