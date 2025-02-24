import asyncHandler from "express-async-handler";
import { UserRequest } from "../utils/utils";
import Order from "../models/orderModel";
import Cart from "../models/cartModel";

// 🔹 Get All Orders for Logged-in User
export const getOrders = asyncHandler(async (req, res) => {
  const user = (req as UserRequest).user;
  const orders = await Order.find({ user: user._id });
  res.json(orders);
});

// 🔹 Place Order (Checkout)
export const placeOrder = asyncHandler(async (req, res) => {
  const user = (req as UserRequest).user;
  let cart = await Cart.findOne({ user: user._id }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const totalPrice = cart.items
    .toObject()
    .reduce(
      (total: number, item: { product: { price: number }; quantity: number }) =>
        total + item.product.price * item.quantity,
      0
    );

  const newOrder = new Order({
    user: user._id,
    items: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalPrice,
    paymentStatus: "pending",
    status: "pending",
  });

  await newOrder.save();
  await Cart.deleteOne({ user: user._id });

  res.status(201).json(newOrder);
});

// 🔹 Get Order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const user = (req as UserRequest).user;
  const order = await Order.findOne({
    _id: req.params.orderId,
    user: user._id,
  });

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

// 🔹 Update Order Status (Admin Only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const user = (req as UserRequest).user;
  if (!user.admin) {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status || order.status;
  order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

  await order.save();
  res.json(order);
});
