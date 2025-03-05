import { Request } from "express";

export interface userAuth {
  id?: string;
  anonId?: string;
  admin?: boolean;
}

export interface UserRequest extends Request {
  user: userAuth;
}

export type paymentStatus = "pending" | "paid" | "failed";

export type orderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled";
