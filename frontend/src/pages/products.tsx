import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductCard from "../components/productCard";
import LoadingSpinner from "../components/loadingSpinner";
import { useRequest } from "../hooks/useRequest";

const Products = () => {
  const { data: products, error, loading, execute } = useRequest<Product[]>();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    execute(getProducts);
  }, [execute]);

  useEffect(() => {
    if (products) {
      let filtered = products;
      if (category !== "all") {
        filtered = filtered.filter((product) => product.category === category);
      }
      if (search) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      setFilteredProducts(filtered);
    }
  }, [products, category, search]);

  return (
    <div className="py-6 min-h-[80vh]">
      <div className="header">
        <h2>Shop Our products</h2>
      </div>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input p-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="bread">Bread</option>
            <option value="cake">Cake</option>
            <option value="pastry">Pastry</option>
          </select>
        </div>

        {error ? (
          <p className="text-error text-center mt-4">{error}</p>
        ) : loading ? (
          <div className="flex justify-center mt-6">
            <LoadingSpinner />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="hover:scale-105 hover:shadow-xl transition-transform"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
