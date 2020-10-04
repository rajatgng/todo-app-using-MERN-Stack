import express, {Express} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from "body-parser";
import logger from 'morgan'
import router from "./routes";
import errorHandler, {ErrorHandler} from "./helper/error-handler";
import path from "path";
import {HTTPStatusCode} from "./types";

require('dotenv').config();
const app: Express = express()

const PORT: string | number = process.env.PORT || 4000;
const uri: string = process.env.MONGO_URL || '';
const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
mongoose.set('useFindAndModify', false)
mongoose.set('returnOriginal', false);

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })


// view engine setup
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.use(router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    throw ErrorHandler(HTTPStatusCode.NotFound, "Route does not exists")
});


app.use(errorHandler)

