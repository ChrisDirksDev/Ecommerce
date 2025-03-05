import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
import { useNavigate } from "react-router-dom";
import { AuthAdmin } from "../services/adminService";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const admin = useAdminStore((state) => state.admin);
  const navigate = useNavigate();


  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }
    , [admin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthAdmin(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
