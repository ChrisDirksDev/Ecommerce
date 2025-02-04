import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white text-white p-4">
      <ul className="flex justify-around">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;