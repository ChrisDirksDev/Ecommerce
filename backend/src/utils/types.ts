import { Request } from "express";

export interface IUserAuth {
  id?: string;
  anonId?: string;
  admin?: boolean;
}

export interface UserRequest extends Request {
  user: IUserAuth;
}

export type paymentStatus = "pending" | "paid" | "failed";

export type orderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled";
