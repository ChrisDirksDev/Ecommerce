import { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";
import { fetchCart, removeProductFromCart, updateProductQuantity } from "../services/cartService";

const Cart = () => {
  const [error, setError] = useState<string | null>(null);
  const { cart } = useCartStore();

  useEffect(() => {
    fetchCart().catch(setError);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : cart.items.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {cart.items.map(({ product, quantity }) => (
            <div key={product._id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>${product.price}</p>
                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => updateProductQuantity(product._id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => updateProductQuantity(product._id, quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeProductFromCart(product._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
