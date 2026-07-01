import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Admin from "../models/adminModel";
import { IAdmin } from "../models";
import { IUserAuth } from "../utils/types";

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

export interface UserRequest extends Request {
  user?: IUserAuth;
}

// Middleware to protect admin routes
export const adminAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401).json("Not authorized, no token");
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(401).json("Not authorized, admin not found");
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json("Not authorized, token failed");
  }
};

// Middleware to check if user is authenticated
export const userAuth = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      req.user = decoded;
      req.user.admin = false;
      return next();
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
      return;
    }
  }

  if (req.headers["x-anon-user-id"]) {
    req.user = {
      anonId: req.headers["x-anon-user-id"] as string,
      admin: false,
    };
    return next();
  }

  res.status(401).json("Authentication required");
  return;
};
