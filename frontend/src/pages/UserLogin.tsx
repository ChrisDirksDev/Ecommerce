import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../services/userService";


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authUser(email, password);
      navigate('/');
    } catch {
      alert('Invalid login');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <h3>Need To Signup? <Link to="/signup">Signup</Link></h3>
    </div>
  );
};

export default UserLogin;