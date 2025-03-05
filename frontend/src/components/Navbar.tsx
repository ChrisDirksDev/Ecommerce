import { Link } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../services/userService";
import useUserStore from "../store/userStore";
import ConfirmDialog from "./ConfirmDialog"; // Import the reusable dialog

const Navbar = () => {
  const { user } = useUserStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-black overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Ecommerce</div>
        <button
          className="md:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      <ul
        className={`${isMenuOpen ? "max-h-screen" : "max-h-0"} md:max-h-screen md:flex md:flex-row justify-around mt-4 transition-all duration-200 items-center`}
      >
        <li className="my-2">
          <Link to="/">Home</Link>
        </li>
        <li className="my-2">
          <Link to="/cart">Cart</Link>
        </li>
        {user && (
          <li className="my-2">
            <Link to="/orders">Orders</Link>
          </li>
        )}
        {user ? (
          <li className="my-2">
            <button
              onClick={() => setShowConfirm(true)}
              className="text-red-500 cursor-pointer"
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="my-2">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <ConfirmDialog
        message="Are you sure you want to log out?"
        isOpen={showConfirm}
        onConfirm={() => {
          logoutUser();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </nav>
  );
};

export default Navbar;
