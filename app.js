import express from "express";
import {responseInterceptor, errorHandler} from "./src/utils";
const request = new RequestValidator();
import indexRouter from "./src/routes/index";

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

app.use(responseInterceptor);
app.use('/', indexRouter);

// error handler
app.use(errorHandler);

module.exports = app;
