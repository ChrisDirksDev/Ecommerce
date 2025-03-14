import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../services/userService";
import useUserStore from "../store/userStore";
import ConfirmDialog from "./confirmDialog";
import CartIcon from "./cartIcon";

const Navbar = () => {
  const { user } = useUserStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="container md:flex md:justify-between items-center text-black overflow-hidden px-4 pt-4">
      <div className="flex justify-between items-center pt-2 md:pt-0">
        <Link className="link" to="/">Ecommerce</Link>
        <button
          className="btn md:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </div>
      <ul className={`${isMenuOpen ? "block" : "hidden"
        } md:flex md:flex-row md:items-center gap-6`}>

        {user ? (
          <>
            <li className="my-2">
              <Link className="link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="my-2">
              <button
                onClick={() => setShowConfirm(true)}
                className="btn btn-primary-inverse"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="my-2">
            <Link className="link" to="/login">Login</Link>
          </li>
        )}
        <li className="my-2">
          <CartIcon />
        </li>
      </ul>
      <ConfirmDialog
        message="Are you sure you want to log out?"
        isOpen={showConfirm}
        onConfirm={() => {
          logoutUser();
          setShowConfirm(false);
          navigate("/");
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </nav>
  );
};

export default Navbar;
