import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import LoadingSpinner from "../components/loadingSpinner";
import Card from "../components/card";
import { placeOrder } from "../services/orderService";

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
    <div className="mx-auto p-4 max-w-3xl">
      <Card title="Checkout">
        {/* Order Summary */}
        <div className="border-b pb-4 mb-4">
          <h3>Order Summary</h3>
          <ul className="space-y-4 mt-2">
            {cart.items.map(({ product, quantity }) => (
              <li
                key={product._id}
                className="flex items-center justify-between border p-3 rounded-lg shadow-sm bg-[var(--color-light-beige)]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p>{quantity} x ${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <p className="font-semibold text-[var(--color-warm-gold)]">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-right font-semibold text-lg mt-4">
            Total: <span className="text-[var(--color-warm-gold)]">${cart.total.toFixed(2)}</span>
          </p>
        </div>

        {/* Shipping Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3>Shipping Details</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-soft-blue)]"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-soft-blue)]"
            required
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-soft-blue)]"
            required
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-soft-blue)]"
            required
            value={formData.postalCode}
            onChange={handleChange}
          />

          {/* Checkout Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size={40} /> : "Place Order"}
            </button>
          </div>
        </form>

      </Card>

    </div>
  );
};

export default Checkout;
