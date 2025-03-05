import { Request } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { UserRequest } from "./types";

export const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const userQuery = (id: string) => {
  if (ObjectId.isValid(id)) {
    return { user: id };
  } else {
    return { anonId: id };
  }
};

export const extractUserFromRequest = (req: Request) => {
  const user = (req as UserRequest).user;
  return user.id || user.anonId || "";
};
