import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../services/userService";
import Card from "../components/card";
import useUserStore from "../store/userStore";

const UserLogin = () => {
  const user = useUserStore((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Track login errors
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }
    , [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await authUser(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };


  const footer = (
    <p className="text-center mt-4">
      Need an account?{" "}
      <Link to="/signup" className="text-[var(--color-dark-brown)] hover:underline">
        Sign up
      </Link>
    </p>
  )

  return (
    <div className="flex flex-col items-center justify-center bg-[var(--color-light-beige)] px-6">
      <Card footer={footer} title="Login">
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

export default UserLogin;
