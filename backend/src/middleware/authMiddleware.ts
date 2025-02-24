import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Admin from "../models/adminModel";
import User from "../models/userModel";

export interface AuthRequest extends Request {
  admin?: any;
}

// Middleware to protect admin routes
export const adminAuth = async (
  req: AuthRequest,
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
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).send("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).send("Not authorized, no token");
  }
};

export interface UserAuthRequest extends Request {
  user?: { _id: string; admin?: boolean };
}
// Middleware to check if user is authenticated
export const userAuth = async (
  req: UserAuthRequest,
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
        _id: string;
      };

      req.user = decoded;
      req.user.admin = false;
      next();
    } catch (error) {
      res.status(401).send("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).send("Not authorized, no token");
  }
};
