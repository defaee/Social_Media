import { NextFunction, Request, Response } from "express";
import userModel from "../../models/User";
import { errorResponse, successResponse } from "../../utils/responses";
import { authValidatorSchema } from "./auth.validators";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, name, password } = req.body;

    // Validation on entries
    await authValidatorSchema.validate({ email, username, name, password }, { abortEarly: false });

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

    return successResponse(res, 201, "you have been registered successfully", user);
  } catch (err) {
    next(err);
  }
};
