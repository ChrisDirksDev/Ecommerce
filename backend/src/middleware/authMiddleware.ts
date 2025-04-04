import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Admin from "../models/adminModel";

export interface AuthRequest extends Request {
  admin?: any;
}

export interface UserRequest extends Request {
  user?: any;
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
      res.status(401).json("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
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
