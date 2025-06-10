import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  id?: string;
}

export function adminauth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    res.status(406).json({ msg: "You are not signed in !" });
    return;
  }
  const jwt_secret = process.env.JWT_KEY;
  if (!jwt_secret) {
    console.log("undefined jwt key");
    return;
  }
  const validate = jwt.verify(token?.toString(), jwt_secret) as JwtPayload;

  if (validate) {
    req.id = validate.id;
    next();
  } else {
    res.status(406).json({ msg: "You are not signed in" });
    return;
  }
}
