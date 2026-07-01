import asyncHandler from "express-async-handler";
import { AuthRequest } from "middleware/authMiddleware";
import { extractUserFromRequest } from "utils/func";
import * as service from "services/orderService";
import { AppError } from "utils/error";

// 🔹 Get All Orders for Logged-in User
export const getOrders = asyncHandler(async (req, res) => {
  const user = extractUserFromRequest(req);
  const orders = await service.fetchOrders(user);

  res.json(orders);
});

// 🔹 Place Order (Checkout)
export const placeOrder = asyncHandler(async (req, res) => {
  const user = extractUserFromRequest(req);
  const order = await service.placeOrder(user);

  res.status(201).json(order);
});

// 🔹 Get Order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const user = extractUserFromRequest(req);
  const { orderId } = req.params;
  const order = await service.fetchOrderById(orderId, user);

  res.json(order);
});

// 🔹 Update Order Status (Admin Only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { admin } = req as AuthRequest;
  if (!admin) {
    throw new AppError("Unauthorized", 401);
  }

  const { orderId } = req.params;
  const { status, paymentStatus } = req.body;

  const order = await service.updateOrderStatus(orderId, status, paymentStatus);

  res.json(order);
});
