import { create } from "zustand";
import { Cart } from "../types";

interface CartState {
  cart: Cart;
  setCart: (cart: Cart) => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: { _id: "", user: "", items: [], total: 0 },
  setCart: (cart) => set({ cart }),
}));

export default useCartStore;
