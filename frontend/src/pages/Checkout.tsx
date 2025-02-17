
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useOrderStore from "../store/orderStore";
import { useEffect } from "react";

const Checkout = () => {

  const navigate = useNavigate();

  const { cart, clearCart, getCart } = useCartStore();
  const { addOrder } = useOrderStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleCheckout = async () => {
    addOrder().then((success) => {
      if (success) {
        clearCart(); // Clear cart after order is placed
        navigate("/orders");
      } else {
        alert("Checkout failed. Please try again.");
      }
    });
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cart.items.map(({ product, quantity }, index) => (
              <li key={product._id + index}>
                {product.name} - ${product.price} x {quantity}
              </li>
            ))}
          </ul>
          <h2>Total: ${cart.total}</h2>
        </>

      )}
      <button onClick={handleCheckout}>Confirm Order</button>
    </div>
  );
};

export default Checkout;
