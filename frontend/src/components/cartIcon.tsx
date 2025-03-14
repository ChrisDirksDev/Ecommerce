import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
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
    <div className="relative w-6">
      <Link to="/cart">
        <div className={`${bounce ? "animate-bounce" : ""} hover:scale-110 transform transition-transform`}>
          <ShoppingCartIcon className="w-6 h-6" />
        </div>
        <span className="absolute -top-2 -right-4 bg-[var(--color-soft-pink-dark)] text-white text-xs px-2 py-1 rounded-full">
          {cart.items.length}
        </span>
      </Link>
    </div>
  );
}
