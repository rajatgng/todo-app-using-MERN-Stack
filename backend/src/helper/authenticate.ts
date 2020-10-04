import User from '../models/user'
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {ErrorHandler} from "./error-handler";
import {HTTPStatusCode} from "../types";

const tokenSecret = "1234-5678-9000";

const getToken = (user: object) => jwt.sign(user, tokenSecret, {expiresIn: 3600});

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) throw ErrorHandler(HTTPStatusCode.Unauthorized, "token is required");

    jwt.verify(token, tokenSecret, (err: any, user: any) => {
        if (err) throw ErrorHandler(HTTPStatusCode.Unauthorized, err.message);
        User.findById(user.id, (err, dbUser) => {
            if (err || !dbUser) return next(err);
            req.user = dbUser;
            next();
        });

    })
}

// const authenticateOrRegister = (req: Request, res: Response, next: NextFunction) => {
//     const {email, password} = req.body;
//     User.findOne({email}, async (err, user) => {
//         if (err) return next(err);
//         try {
//             if (!user) {
//                 const hash = bcrypt.hashSync(password, 10);
//                 const newUser = await User.create({email, password: hash});
//                 res.status(200).json({success: true, status: 'Registration Successful!', user: newUser})
//             } else {
//                 if (bcrypt.compareSync(password, user.password)) {
//                     const token = getToken({id: user.id})
//                     res.status(200).json({success: true, status: 'Login Successful!', token, user: user})
//                 } else {
//                     res.status(400).json({message: 'Invalid Password'});
//                 }
//             }
//         } catch (e) {
//             next(e);
//         }
//     });
// }

export default {getToken, isAuthorized}