import axios from "./axiosConfig";
import { Product } from "../types";
import { authHeader } from "../utils";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`/products`);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product) => {
  const response = await axios.post("/products", product, authHeader());
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`/products/${id}`, authHeader());
  return response.data;
};
