import { Cart, Order } from "models";
import { orderStatus, paymentStatus } from "utils/types";
import { AppError } from "utils/error";

export const fetchOrders = async (user: string) => {
  return await Order.find({ user });
};

export const placeOrder = async (user: string) => {
  let cart = await Cart.findOne({ user }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  const totalPrice = cart.items
    .toObject()
    .reduce(
      (total: number, item: { product: { price: number }; quantity: number }) =>
        total + item.product.price * item.quantity,
      0
    );

  const newOrder = new Order({
    user: user,
    items: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalPrice,
    paymentStatus: "pending",
    status: "pending",
  });

  await newOrder.save();
  await Cart.deleteOne({ user });

  return newOrder;
};

export const fetchOrderById = async (orderId: string, user: string) => {
  const order = await Order.findOne({
    _id: orderId,
    user,
  })
    .populate("items.product")
    .lean();

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

export const updateOrderStatus = async (
  orderId: string,
  status: orderStatus,
  paymentStatus: paymentStatus
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  order.status = status || order.status;
  order.paymentStatus = paymentStatus || order.paymentStatus;

  await order.save();
  return order;
};
