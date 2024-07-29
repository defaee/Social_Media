import { NextFunction, Request, Response } from "express";
import userModel from "../../models/User";
import { errorResponse, successResponse } from "../../utils/responses";
import { authValidatorSchema } from "./auth.validators";
import { sign } from "jsonwebtoken";
import refreshTokenModel from "../../models/RefreshToken";
import { isValidObjectId, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, name, password } = req.body;

    // Validation on entries
    await authValidatorSchema.validate({ email, username, name, password }, { abortEarly: true });
    const isExistsUser: { _id: string } | null = await userModel
      .findOne({ $or: [{ email }, { username }] })
      .select(["_id"])
      .lean()
      .then((res) => JSON.parse(JSON.stringify(res)));

    if (isExistsUser) {
      return errorResponse(res, 400, "Email or Username already exists", {});
    }
    const isFirstUser: boolean = (await userModel.countDocuments()) === 0;
    let role = "USER";
    if (isFirstUser) {
      role = "ADMIN";
    }
    let user = new userModel({ email, username, name, password, role });
    user = await user.save().then((res) => JSON.parse(JSON.stringify(res)));

    user.password = "";
    const accessToken = sign({ userID: user?._id }, process.env.ACCESS_TOKEN_SECRET_KEY || "ja6UvieUI6i32bkjcjiqug7qboiwgf78", {
      expiresIn: "30day",
    });
    if (!isValidObjectId(user._id)) {
      return errorResponse(res, 422, "userID is not Valid", {});
    }
    const expireInDays: number = Number(process.env.REFRESH_TOKEN_EXPIRE_IN_DAYS) || 30;
    const refreshToken: string = uuidv4();
    const refreshTokenDocument = await refreshTokenModel.create({
      userID: user._id,
      token: refreshToken,
      expire: new Date(Date.now() + expireInDays * 24 * 60 * 60 * 1000),
    });

    res.cookie("access-token", accessToken, { httpOnly: true, maxAge: 900_000 });
    res.cookie("refresh-token", refreshTokenDocument, { httpOnly: true, maxAge: 900_000 });

    return successResponse(res, 201, "you have been registered successfully", user);
  } catch (err) {
    next(err);
  }
};
