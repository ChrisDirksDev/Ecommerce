import { useEffect } from "react";
import { fetchCart, removeProductFromCart, updateProductQuantity } from "../services/cartService";
import { useRequest } from "../hooks/useRequest";
import LoadingSpinner from "../components/loadingSpinner";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const { loading, error, execute } = useRequest<void>();
  const navigate = useNavigate();

  useEffect(() => {
    execute(fetchCart);
  }, [execute]);

  return (
    <div className="mx-auto">
      <div className="header">
        <h2 className="text-center">Shopping Cart</h2>
      </div>
      <div className="p-4 max-w-md mx-auto">

        {error && <p className="text-error text-center">{error}</p>}
        {loading ? (
          <div className="flex justify-center mt-6">
            <LoadingSpinner />
          </div>
        ) : cart.items.length === 0 ? (
          <p className="mt-4 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid gap-4 mt-6">
              {cart.items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="flex flex-row items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
                >
                  {/* Product Info */}
                  <div className="flex flex-col items-start gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3>{product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    {/* Quantity Controls */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateProductQuantity(product._id, quantity - 1)}
                        disabled={quantity <= 1 || loading}
                        className="btn btn-primary px-3 py-1 rounded disabled:opacity-50 transition"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-lg">{quantity}</span>
                      <button
                        onClick={() => updateProductQuantity(product._id, quantity + 1)}
                        disabled={quantity >= 10 || loading}
                        className="btn btn-primary px-3 py-1 rounded disabled:opacity-50 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to remove this item?")) {
                        removeProductFromCart(product._id);
                      }
                    }}
                    className="btn btn-danger"
                    aria-label="Remove product from cart"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate("/checkout")}
                disabled={loading || !user}
                className="btn btn-primary disabled:opacity-50"
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
