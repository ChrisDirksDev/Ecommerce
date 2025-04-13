import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/adminDashboard";
import Orders from "./pages/orders";
import OrderDetails from "./pages/orderDetails";
import Checkout from "./pages/checkout";
import Signup from "./pages/userSignUp";
import Login from "./pages/userLogin";
import Demo from "./pages/demoPage";
import Products from "./pages/products";
import OrderConfirmation from "./pages/order-confirmation";
import PrivacyPolicy from "./pages/privacyPolicy";
import NotFound from "./pages/404";
import UserDashboard from "./pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route
        path="/checkout/confirmation/:orderId"
        element={<OrderConfirmation />}
      />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
