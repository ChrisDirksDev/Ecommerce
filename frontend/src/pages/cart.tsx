import { useEffect } from "react";
import { fetchCart, removeProductFromCart, updateProductQuantity } from "../services/cartService";
import { useRequest } from "../hooks/useRequest";
import LoadingSpinner from "../components/loadingSpinner";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const { loading, error, execute } = useRequest<void>();
  const navigate = useNavigate();

  useEffect(() => {
    execute(fetchCart);
  }, [execute]);

  return (
    <div className="min-h-[80vh]">
      <div className="header">
        <p className="eyebrow">Order review</p>
        <h2 className="mt-3">Shopping Cart</h2>
      </div>
      <div className="section-shell pt-10">

        {error && <p className="text-error text-center">{error}</p>}
        {loading ? (
          <div className="flex justify-center mt-6">
            <LoadingSpinner />
          </div>
        ) : cart.items.length === 0 ? (
          <div className="surface-panel mx-auto max-w-xl p-10 text-center">
            <h3>Your cart is empty</h3>
            <p className="mt-2">Add a few bakery favorites before checkout.</p>
            <button className="btn btn-primary mt-6" onClick={() => navigate("/products")}>
              Shop products
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
            <div className="grid gap-4">
              {cart.items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="surface-panel grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      <div>
                      <h3 className="text-lg">{product.name}</h3>
                      <p className="mt-1 font-bold text-[var(--color-ink)]">${product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
                      <button
                        onClick={() => updateProductQuantity(product._id, quantity - 1)}
                        disabled={quantity <= 1 || loading}
                        className="px-3 py-2 text-[var(--color-ink)] transition hover:bg-[var(--color-cream)] disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="min-w-10 text-center font-bold">{quantity}</span>
                      <button
                        onClick={() => updateProductQuantity(product._id, quantity + 1)}
                        disabled={quantity >= 10 || loading}
                        className="px-3 py-2 text-[var(--color-ink)] transition hover:bg-[var(--color-cream)] disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this item?")) {
                          removeProductFromCart(product._id);
                        }
                      }}
                      className="btn btn-danger px-3 py-2"
                      aria-label="Remove product from cart"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="surface-panel h-fit p-6">
              <h3>Order Summary</h3>
              <div className="mt-5 space-y-3 border-y border-[var(--color-border)] py-5 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[var(--color-ink)]">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated delivery</span>
                  <span className="font-bold text-[var(--color-ink)]">Calculated later</span>
                </div>
              </div>
              <div className="mt-5 flex justify-between text-lg font-bold text-[var(--color-ink)]">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                disabled={loading || !user}
                className="btn btn-primary mt-6 w-full"
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
              </button>
              {!user && <p className="mt-3 text-sm">Sign in to continue with the secure checkout flow.</p>}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
