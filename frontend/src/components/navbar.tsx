import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../services/userService";
import useUserStore from "../store/userStore";
import ConfirmDialog from "./confirmDialog";
import CartIcon from "./cartIcon";
import { Bars3Icon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user } = useUserStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(247,242,234,0.92)] backdrop-blur">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-6">
          <Link className="group flex items-center gap-3" to="/" aria-label="Sweet Bites home">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-ink)] text-sm font-bold text-white">
              SB
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold text-[var(--color-ink)]">Sweet Bites</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-warm-gold)]">
                Bakery Market
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link className="link" to="/products">Shop</Link>
            {user && <Link className="link" to="/dashboard">Dashboard</Link>}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="btn btn-primary-inverse py-2"
              >
                <UserCircleIcon className="h-5 w-5" />
                Logout
              </button>
            ) : (
              <Link className="btn btn-primary-inverse py-2" to="/login">
                <UserCircleIcon className="h-5 w-5" />
                Login
              </Link>
            )}
            <CartIcon />
          </div>

        <button
          className="btn btn-primary-inverse px-3 py-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

        {isMenuOpen && (
          <ul className="mt-4 grid gap-3 rounded-lg border border-[var(--color-border)] bg-white p-4 md:hidden">
            <li>
              <Link className="link" to="/products" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link className="link" to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="btn btn-primary-inverse w-full"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link className="btn btn-primary-inverse w-full" to="/login" onClick={() => setIsMenuOpen(false)}>
                  <UserCircleIcon className="h-5 w-5" />
                  Login
                </Link>
              </li>
            )}
            <li className="pt-2">
              <CartIcon />
            </li>
          </ul>
        )}
      </div>
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
