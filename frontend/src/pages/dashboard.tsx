import { Link } from "react-router-dom";
import { useState } from "react";
import { UserIcon, BellIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import useUserStore from "../store/userStore";
import Tooltip from "../components/tooltip";

const UserDashboard = () => {
  const user = useUserStore((state) => state.user);
  const [notifications] = useState([
    "Your order #1234 has shipped!",
    "New promotion: 20% off your next purchase!",
  ]);

  return (
    <div className="mx-auto ">
      <div className="header">
        <h2 className="text-3xl">Dashboard</h2>
      </div>
      <div className="container p-6">
        <h1 className="text-3xl text-[var(--color-warm-gold)]">Welcome, {user?.name}!</h1>
        <p className="mt-2 text-[var(--color-muted-gray-brown)]">
          Manage your account, track your orders, and stay updated.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Orders */}
          <div className="p-6 bg-white shadow-md rounded-2xl text-center">
            <ShoppingCartIcon className="w-10 h-10 mx-auto text-[var(--color-warm-gold)]" />
            <h2 className="text-xl mt-3">Your Orders</h2>
            <p className="text-sm text-[var(--color-muted-gray-brown)]">Track your recent purchases</p>
            <Link to="/orders" className="link">View Orders</Link>
          </div>

          {/* Notifications */}
          <div className="p-6 bg-white shadow-md rounded-2xl text-center">
            <BellIcon className="w-10 h-10 mx-auto text-[var(--color-warm-gold)]" />
            <h2 className="text-xl mt-3">Notifications</h2>
            <ul className="text-sm text-[var(--color-muted-gray-brown)] mt-2">
              {notifications.length > 0 ? (
                notifications.map((note, index) => <li key={index}>{note}</li>)
              ) : (
                <li>No new notifications</li>
              )}
            </ul>
          </div>

          {/* Account Settings */}
          <div className="p-6 bg-white shadow-md rounded-2xl text-center">
            <UserIcon className="w-10 h-10 mx-auto text-[var(--color-warm-gold)]" />
            <h2 className="text-xl mt-3">Account Settings</h2>
            <p className="text-sm text-[var(--color-muted-gray-brown)]">Update your profile and preferences</p>
            <Tooltip text="This is a dummy feature">
              <span className="link">Manage Account</span>
            </Tooltip>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;