import axios from "./axiosConfig";
import { Order } from "../types";
import { authHeader } from "../utils";

// Fetch all orders
export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get("/orders", authHeader());
  return response.data;
};

// Place an order
export const placeOrder = async (): Promise<Order> => {
  const response = await axios.post("/orders", null, authHeader());
  return response.data;
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await axios.get(`/orders/${orderId}`, authHeader());
  return response.data;
};
