import { useEffect } from "react";
import useCartStore from "../store/cartStore";

const Cart = () => {
  const { cart, removeFromCart, getCart } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {cart.items.map(({ product, quantity }) => (
            <div key={product._id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>${product.price}</p>
                <p>Quantity: {quantity}</p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromCart(product._id)}
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
