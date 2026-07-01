import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const [bounce, setBounce] = useState(false);

  const { cart } = useCartStore();

  useEffect(() => {
    triggerBounce();
  }, [cart]);

  const triggerBounce = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 500); // Reset after animation
  };

  return (
    <div className="relative inline-flex">
      <Link to="/cart" className="btn btn-primary px-4 py-2" aria-label={`Cart with ${cart.items.length} items`}>
        <span className={`${bounce ? "animate-bounce" : ""} transform transition-transform`}>
          <ShoppingBagIcon className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">Cart</span>
        <span className="absolute -right-2 -top-2 min-w-6 rounded-full bg-[var(--color-warm-gold)] px-2 py-1 text-center text-xs font-bold text-white">
          {cart.items.length}
        </span>
      </Link>
    </div>
  );
}
