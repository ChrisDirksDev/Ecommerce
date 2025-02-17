import { create } from "zustand";
import { Order } from "../types/types";
import { fetchOrders, placeOrder } from "../utils/api";
import { useUserStore } from "./userStore";

interface OrderState {
  orders: Order[];
  getOrders: () => void;
  addOrder: () => Promise<boolean>;
}

const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  getOrders() {
    const token = useUserStore.getState().user?.token;
    if (!token) {
      set({ orders: [] });
      return;
    }

    fetchOrders(token).then((orders) => {
      set({ orders });
    });
  },
  addOrder: async () => {
    const token = useUserStore.getState().user?.token;
    if (!token) return false;

    const order = await placeOrder(token);
    console.log(order);
    if (!order) return false;

    set((state) => ({ orders: [...state.orders, order] }));
    return true;
  },
}));

export default useOrderStore;
