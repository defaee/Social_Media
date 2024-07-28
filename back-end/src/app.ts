import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { setHeaders } from "./middlewares/header";
import errorHanlder from "./middlewares/errorHandler";
import authRouter from "./modules/auth/auth.router";
const app: Express = express();

// set CORS policy
app.use(setHeaders);

// set Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);

// TODO: must complete error handler middleware
// app.use(errorHanlder);

export default app;
