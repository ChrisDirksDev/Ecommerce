import * as api from "../api/cart";
import { logError } from "../utils/logging";
import { setCart } from "../utils/storage";

//const emptyCart = { _id: "", user: "", items: [], total: 0 };

/**
 * Fetches the current cart from the server and updates the cart store.
 */
export const fetchCart = async (): Promise<void> => {
  try {
    const cart = await api.getCart();
    setCart(cart);
  } catch (error) {
    logError("fetchCart", error);
  }
};

/**
 * Adds a product to the cart and updates the cart store.
 * @param product - The product ID.
 */
export const addProductToCart = async (
  product: string,
  quantity: number
): Promise<void> => {
  try {
    const cart = await api.addToCart(product, quantity);
    setCart(cart);
  } catch (error) {
    logError("addProductToCart", error);
  }
};

/**
 * Removes a product from the cart and updates the cart store.
 * @param productId - The product ID.
 */
export const removeProductFromCart = async (
  productId: string
): Promise<void> => {
  try {
    const cart = await api.removeFromCart(productId);
    setCart(cart);
  } catch (error) {
    logError("removeProductFromCart", error);
  }
};

/**
 * Updates the quantity of a product in the cart and updates the cart store.
 * @param productId - The product ID.
 * @param quantity - The new quantity.
 */
export const updateProductQuantity = async (
  productId: string,
  quantity: number
): Promise<void> => {
  try {
    const cart = await api.updateCart(productId, quantity);
    setCart(cart);
  } catch (error) {
    logError("updateProductQuantity", error);
  }
};

/**
 * Clears the cart and updates the cart store.
 */
export const clearCart = async (): Promise<void> => {
  try {
    const cart = await api.clearCart();
    setCart(cart);
  } catch (error) {
    logError("clearCart", error);
  }
};
