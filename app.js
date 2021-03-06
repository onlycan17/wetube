import express from "express"; //const express = require('express')
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {localsMiddleware} from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(helmet());
app.use(localsMiddleware);
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    });

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
