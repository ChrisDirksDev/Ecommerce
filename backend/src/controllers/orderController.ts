import asyncHandler from "express-async-handler";
import { UserRequest } from "../utils/utils";
import Order from "../models/orderModel";
import Cart from "../models/cartModel";

// 🔹 Get All Orders for Logged-in User
export const getOrders = asyncHandler(async (req: UserRequest, res) => {
  const user = req.user;
  const orders = await Order.find({ user: user.id }).populate(
    "items.productId"
  );
  res.json(orders);
});

// 🔹 Place Order (Checkout)
export const placeOrder = asyncHandler(async (req: UserRequest, res) => {
  const user = req.user;
  const cart = await Cart.findOne({ user: user.id }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400).json({ message: "Cart is empty" });
    return;
  }

  const totalPrice = cart.items
    .toObject()
    .reduce(
      (total: number, item: { product: { price: number }; quantity: number }) =>
        total + item.product.price * item.quantity,
      0
    );

  const newOrder = new Order({
    user: user.id,
    items: cart.items,
    totalPrice,
    paymentStatus: "pending",
    status: "pending",
  });

  await newOrder.save();
  await Cart.deleteOne({ user: user.id });

  res.status(201).json(newOrder);
});

// 🔹 Get Order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const { user } = req.body;
  const order = await Order.findOne({
    _id: req.params.orderId,
    user: user.id,
  }).populate("items.product");

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.json(order);
});

// 🔹 Update Order Status (Admin Only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { user } = req.body;
  if (user.role !== "admin") {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  order.status = req.body.status || order.status;
  order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

  await order.save();
  res.json(order);
});
