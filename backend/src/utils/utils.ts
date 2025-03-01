import { Request } from "express";
import jwt from "jsonwebtoken";

export interface UserRequest extends Request {
  user: { _id: string; uuid: string; admin?: boolean };
}

export const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const userQuery = (user: { _id: string; uuid: string }) => {
  if (user._id) {
    return { user: user._id };
  } else {
    return { anonId: user.uuid };
  }
};
