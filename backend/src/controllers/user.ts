import {NextFunction, Request, Response} from 'express'
import User from "../models/user";
import authenticate from "../helper/authenticate";
import bcrypt from 'bcryptjs';
import {ErrorHandler} from "../helper/error-handler";
import {HTTPStatusCode} from "../types";

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email, password} = req.body;
    User.findOne({email}, async (err, user) => {
        if (err) return next(err);
        try {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = authenticate.getToken({id: user.id})
                    res.status(200).json({success: true, status: 'Login Successful!', token, user})
                } else {
                    throw ErrorHandler(HTTPStatusCode.Unauthorized, "Invalid Password")
                    // res.status(400).json({message: 'Invalid Password'});
                }
            } else {
                // res.status(400).json({message: 'User not exist'});
                throw ErrorHandler(HTTPStatusCode.NotFound, "User not exist")
            }
        } catch (e) {
            next(e);
        }
    });
}

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email, password} = req.body;

    User.findOne({email}, async (err, user) => {
        if (err) return next(err);
        try {
            if (!user) {
                const hash = bcrypt.hashSync(password, 10);
                const newUser = await User.create({email, password: hash});
                res.status(200).json({success: true, status: 'Registration Successful!', user: newUser})
            } else {
                // res.status(400).json({message: 'User already exist'});
                throw ErrorHandler(HTTPStatusCode.Conflict, "User already exist")
            }
        } catch (e) {
            next(e);
        }
    });
}

export {signup, login}