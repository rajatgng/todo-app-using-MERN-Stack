"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importStar(require("./helper/error-handler"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const app = express_1.default();
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URL || '';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('returnOriginal', false);
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
// view engine setup
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'jade');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(routes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    throw error_handler_1.ErrorHandler(404 /* NotFound */, "Route does not exists");
});
app.use(error_handler_1.default);
