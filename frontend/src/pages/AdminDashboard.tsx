import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../store/adminStore";
import { LogoutAdmin } from "../services/adminService";
import { getProducts, createProduct, deleteProduct } from "../api/products";
import { Product, ProductCategory } from "../types";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
    category: ProductCategory.Cookies,
  });
  const admin = useAdminStore((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    } else {
      getProducts()
        .then(setProducts)
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [admin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "number" ? +e.target.value : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0) return;

    try {
      const createdProduct = await createProduct(newProduct);
      if (createdProduct) {
        setProducts((prev) => [...prev, createdProduct]); // Update product list
      }
      setNewProduct({ _id: "", name: "", price: 0, description: "", imageUrl: "", category: ProductCategory.Cookies }); // Reset form
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-light-beige p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-cherry text-dark-brown">Admin Dashboard</h2>
          <button
            onClick={LogoutAdmin}
            className="btn btn-danger"
          >
            Logout
          </button>
        </div>

        <h3 className="text-xl font-quicksand text-dark-brown mb-4">Add Product</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-muted-gray rounded-lg focus:ring-2 focus:ring-warm-gold font-quicksand"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-muted-gray rounded-lg focus:ring-2 focus:ring-warm-gold font-quicksand"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-muted-gray rounded-lg focus:ring-2 focus:ring-warm-gold font-quicksand"
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-muted-gray rounded-lg focus:ring-2 focus:ring-warm-gold font-quicksand"
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-muted-gray rounded-lg focus:ring-2 focus:ring-warm-gold font-quicksand"
          >
            {Object.values(ProductCategory).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Add Product
          </button>
        </form>

        <h3 className="text-xl font-quicksand text-dark-brown mt-8 mb-4">Product List</h3>
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product._id}
              className="flex justify-between items-center bg-[#f5f5f5] p-4 rounded-lg shadow"
            >
              <span className="font-quicksand">{product.name} - ${product.price} ({product.category})</span>
              <button
                onClick={() => removeProduct(product._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
