import useCartStore from "../store/cartStore";

const Cart = () => {
  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {cart.map((product) => (
            <div key={product.id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>${product.price}</p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromCart(product.id)}
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
