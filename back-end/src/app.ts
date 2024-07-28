import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { setHeaders } from "./middlewares/header";
const app: Express = express();

// set CORS policy
app.use(setHeaders);

// set Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
