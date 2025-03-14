import { useState } from "react";
import { addProductToCart } from "../services/cartService";
import { Product } from "../types";

export const useAddToCart = () => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (product: Product, quantity: number) => {
    addProductToCart(product._id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return { added, handleAddToCart };
};
