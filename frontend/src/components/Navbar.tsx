import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../store/userStore";
import ConfirmDialog from "./ConfirmDialog"; // Import the reusable dialog

const Navbar = () => {
  const { user, logout } = useUserStore();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <nav className="bg-white text-black p-4">
      <ul className="flex justify-around">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        {user ? (
          <li>
            <button onClick={() => setShowConfirm(true)} className="text-red-500">Logout</button>
          </li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
      <ConfirmDialog
        message="Are you sure you want to log out?"
        isOpen={showConfirm}
        onConfirm={() => {
          logout();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </nav>
  );
};

export default Navbar;
