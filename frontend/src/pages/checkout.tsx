import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import LoadingSpinner from "../components/loadingSpinner";
import Card from "../components/card";
import { placeOrder } from "../services/orderService";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    address: "123 Main St",
    city: "New York",
    postalCode: "10001",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    placeOrder().then((order) => {
      setLoading(false);
      alert("Order placed successfully!");
      navigate("/checkout/confirmation/" + order._id);
    }
    );
  };

  return (
    <div className="section-shell pt-8">
      <div className="mb-8">
        <p className="eyebrow">Secure checkout</p>
        <h1 className="mt-3 text-4xl md:text-5xl">Complete your order</h1>
      </div>
      <Card className="max-w-none p-6 md:p-8" title="Checkout">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3>Shipping Details</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full"
            required
            value={formData.address}
            onChange={handleChange}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full"
              required
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              className="w-full"
              required
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4 text-sm">
            <div className="flex items-center gap-2 font-bold text-[var(--color-ink)]">
              <LockClosedIcon className="h-5 w-5 text-[var(--color-success)]" />
              Demo-safe checkout
            </div>
            <p className="mt-2">No payment fields are collected in this portfolio flow.</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || cart.items.length === 0}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size={40} /> : "Place Order"}
            </button>
          </div>
        </form>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
          <h3>Order Summary</h3>
          <ul className="space-y-4 mt-2">
            {cart.items.map(({ product, quantity }) => (
              <li
                key={product._id}
                className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] py-4 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-bold text-[var(--color-ink)]">{product.name}</p>
                    <p className="text-sm">{quantity} x ${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <p className="font-bold text-[var(--color-ink)]">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex justify-between text-lg font-bold text-[var(--color-ink)]">
            <span>Total</span>
            <span>${cart.total.toFixed(2)}</span>
          </p>
        </div>
        </div>

      </Card>

    </div>
  );
};

export default Checkout;
