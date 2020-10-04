"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("./models/user"));
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const options = {
    usernameField: 'email',
    usernameLowerCase: true,
    session: false
};
passport_1.default.use(user_1.default.createStrategy());
// passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()));
passport_1.default.serializeUser(user_1.default.serializeUser());
passport_1.default.deserializeUser(user_1.default.deserializeUser());
function getToken(user) {
    return jsonwebtoken_1.default.sign(user, "1234-5678-9000", { expiresIn: 3600 });
}
let opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "1234-5678-9000",
};
const jwtPassport = passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
    // console.log("JWT payload: ", jwt_payload);
    user_1.default.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
const verifyUser = passport_1.default.authenticate('jwt', { session: false });
exports.default = { getToken, jwtPassport, verifyUser };
