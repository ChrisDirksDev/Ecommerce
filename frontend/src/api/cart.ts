import axios from "./axiosConfig";
import { Cart } from "../types";
import { authHeader } from "../utils";

export const getCart = async (): Promise<Cart> => {
  const response = await axios.get("/cart", authHeader());
  return response.data;
};

export const addToCart = async (
  product: string,
  quantity: number
): Promise<Cart> => {
  const response = await axios.post(
    `/cart/items`,
    { product, quantity },
    authHeader()
  );
  return response.data;
};

export const removeFromCart = async (productId: string): Promise<Cart> => {
  const response = await axios.delete(`/cart/items/${productId}`, authHeader());
  return response.data;
};

export const updateCart = async (
  productId: string,
  quantity: number
): Promise<Cart> => {
  const response = await axios.put(
    `/cart/items/${productId}`,
    { quantity },
    authHeader()
  );
  return response.data;
};

export const clearCart = async (): Promise<Cart> => {
  const response = await axios.put("/cart/items", { items: [] }, authHeader());
  return response.data;
};
