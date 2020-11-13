import express from "express";
import cookieParser from "cookie-parser";
import { responseInterceptor, errorHandler, responseModifier } from "./src/utils";
import RequestValidator from "./src/module/request-validator";
const request = new RequestValidator();
import indexRouter from "./src/routes/index";


var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(responseModifier);

app.use(request.validator.bind(request));
app.use(responseInterceptor);
app.use('/', indexRouter);

// error handler
app.use(errorHandler);

module.exports = app;
