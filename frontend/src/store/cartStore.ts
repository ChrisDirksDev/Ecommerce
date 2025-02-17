import { create } from "zustand";
import { Product, Cart } from "../types/types";
import { addToCart, getCart, removeFromCart, clearCart } from "../utils/api";
import { useUserStore } from "./userStore";
interface CartState {
  cart: Cart;
  getCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: { _id: "", user: "", items: [], total: 0 },
  getCart: () => {
    const token = useUserStore.getState().user?.token;
    if (token) {
      getCart(token).then((cart) => {
        if (cart) {
          set({ cart });
        }
      });
    }
  },
  addToCart: (product: Product) => {
    const token = useUserStore.getState().user?.token;
    if (token) {
      // If user is logged in, add to cart in the database
      addToCart(product._id, token).then((cart) => {
        if (cart) {
          set({ cart });
        }
      });
    } else {
      // If user is not logged in, add to cart in the store
      set((state) => {
        if (state.cart) {
          const existingItem = state.cart.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              cart: {
                ...state.cart,
                items: state.cart.items.map((item) =>
                  item.product._id === product._id
                    ? { product, quantity: item.quantity + 1 }
                    : item
                ),
                totalPrice: state.cart.total + product.price,
              },
            };
          }
          return {
            cart: {
              ...state.cart,
              items: [...state.cart.items, { product, quantity: 1 }],
              totalPrice: state.cart.total + product.price,
            },
          };
        }
        return {
          cart: {
            _id: "",
            user: "",
            items: [{ product, quantity: 1 }],
            total: product.price,
          },
        };
      });
    }
  },
  removeFromCart: (id) => {
    const token = useUserStore.getState().user?.token;
    if (token) {
      // If user is logged in, remove from cart in the database
      removeFromCart(id, token).then((cart) => {
        if (cart) {
          set({ cart });
        }
      });
    } else {
      // If user is not logged in, remove from cart in the store
      set((state) => {
        if (state.cart) {
          const existingItem = state.cart.items.find(
            (item) => item.product._id === id
          );
          if (existingItem) {
            if (existingItem.quantity > 1) {
              return {
                cart: {
                  ...state.cart,
                  items: state.cart.items.map((item) =>
                    item.product._id === id
                      ? { product: item.product, quantity: item.quantity - 1 }
                      : item
                  ),
                  totalPrice: state.cart.total - existingItem.product.price,
                },
              };
            }
            return {
              cart: {
                ...state.cart,
                items: state.cart.items.filter(
                  (item) => item.product._id !== id
                ),
                totalPrice: state.cart.total - existingItem.product.price,
              },
            };
          }
        }
        return state;
      });
    }
  },
  clearCart: () => {
    const token = useUserStore.getState().user?.token;
    if (token) {
      clearCart(token).then((cart) => {
        if (cart) {
          set({ cart });
        }
      });
    } else {
      set((state) => {
        if (state.cart) {
          return { cart: { ...state.cart, items: [], total: 0 } };
        }
        return state;
      });
    }
  },
}));

export default useCartStore;
