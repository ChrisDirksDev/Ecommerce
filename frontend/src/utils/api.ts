import axios from "axios";
import { Order, Product, User, Cart } from "../types/types";

interface requestAuth {
  headers: { Authorization: string };
}

export const authHeader = (token: string): requestAuth => ({
  headers: { Authorization: `Bearer ${token}` },
});

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`/products`);
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

// Fetch all orders
export const fetchOrders = async (token: string): Promise<Order[]> => {
  const response = await axios.get("/orders", authHeader(token));
  return response.data;
};

// Place an order
export const placeOrder = async (token: string): Promise<Order> => {
  const response = await axios.post("/orders", null, authHeader(token));
  return response.data;
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await axios.get(`/orders/${orderId}`);
  return response.data;
};

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  await axios.post("/user/signup", { name, email, password });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await axios.post("/user/login", { email, password });
  return response.data;
};

export const getCart = async (token: string): Promise<Cart> => {
  const response = await axios.get("/cart", authHeader(token));
  return response.data;
};

export const addToCart = async (
  productId: string,
  token: string
): Promise<Cart> => {
  const response = await axios.post(
    `/cart/add`,
    { productId },
    authHeader(token)
  );
  return response.data;
};

export const removeFromCart = async (
  productId: string,
  token: string
): Promise<Cart> => {
  const response = await axios.delete(
    `/cart/remove/${productId}`,
    authHeader(token)
  );
  return response.data;
};

export const clearCart = async (token: string): Promise<Cart> => {
  const response = await axios.put(
    "/cart/update",
    { items: [] },
    authHeader(token)
  );
  return response.data;
};
