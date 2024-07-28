import { Router } from "express";
import { register } from "./auth.controller";

const authRouter: Router = Router();

// register endpoint
authRouter.route("/register").post(register);

export default authRouter;
