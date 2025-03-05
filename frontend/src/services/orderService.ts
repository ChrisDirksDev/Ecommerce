import * as api from "../api/order";
import { logError } from "../utils/logging";
import { getOrders, setOrders } from "../utils/storage";

/**
 * Fetches all orders from the server and sets them in the store.
 */
export const fetchOrders = async () => {
  try {
    const response = await api.getOrders();
    setOrders(response);
  } catch (error) {
    logError("fetchOrders", error);
    throw error;
  }
};

/**
 * Places an order and adds it to the store.
 */
export const placeOrder = async () => {
  try {
    const response = await api.placeOrder();
    setOrders(getOrders().concat(response));
    return response;
  } catch (error) {
    logError("placeOrder", error);
    throw error;
  }
};

/**
 * Fetches an order by its ID.
 */
export const fetchOrderById = async (orderId: string) => {
  try {
    const response = await api.getOrderById(orderId);
    return response;
  } catch (error) {
    logError("fetchOrderById", error);
    throw error;
  }
};
