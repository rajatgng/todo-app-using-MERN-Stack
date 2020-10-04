"use strict";
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
const error_handler_1 = __importDefault(require("./helper/error-handler"));
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
app.use(error_handler_1.default);
