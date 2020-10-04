"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("./error-handler");
const tokenSecret = "1234-5678-9000";
const getToken = (user) => jsonwebtoken_1.default.sign(user, tokenSecret, { expiresIn: 3600 });
const isAuthorized = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        throw error_handler_1.ErrorHandler(401 /* Unauthorized */, "token is required");
    jsonwebtoken_1.default.verify(token, tokenSecret, (err, user) => {
        if (err)
            throw error_handler_1.ErrorHandler(401 /* Unauthorized */, err.message);
        user_1.default.findById(user.id, (err, dbUser) => {
            if (err || !dbUser)
                return next(err);
            req.user = dbUser;
            next();
        });
    });
};
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
exports.default = { getToken, isAuthorized };
