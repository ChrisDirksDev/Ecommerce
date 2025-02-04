import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const admin = useAdminStore((state) => state.admin);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, description: "" });

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    } else {
      axios.get("/products", {
        headers: { Authorization: `Bearer ${admin.token}` }
      })
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [admin, navigate]);

  const createProduct = async () => {
    if (!admin) return;
    await axios.post("/products", newProduct, {
      headers: { Authorization: `Bearer ${admin.token}` }
    });
    window.location.reload(); // Refresh product list
  };

  const deleteProduct = async (id: string) => {
    if (!admin) return;
    await axios.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${admin.token}` }
    });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => useAdminStore.getState().logout()}>Logout</button>

      <h3>Add Product</h3>
      <input type="text" placeholder="Name" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input type="number" placeholder="Price" onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })} />
      <textarea placeholder="Description" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
      <button onClick={createProduct}>Add Product</button>

      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
