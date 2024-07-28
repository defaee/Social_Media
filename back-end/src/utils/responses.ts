import { Response } from "express";

const successResponse = (res: Response, statusCode: number = 200, msg: string, data: any) => {
  return res.status(statusCode).json({ msg, data });
};

const errorResponse = (res: Response, statusCode: number = 500, msg: string, data: any) => {
  return res.status(statusCode).json({ msg, data });
};

export = { errorResponse, successResponse };
