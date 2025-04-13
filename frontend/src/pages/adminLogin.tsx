import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
import { useNavigate } from "react-router-dom";
import { AuthAdmin } from "../services/adminService";
import Card from "../components/card";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      setError("Invalid email or password. Please try again.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[var(--color-light-beige)] px-6">
      <Card title="Admin Login">
        {error && <p className="text-error text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
