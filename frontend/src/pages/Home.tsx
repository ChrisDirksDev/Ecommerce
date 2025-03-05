import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductCard from "../components/productCard";

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => {
      setError("Error fetching products");
    });
  }, []);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product
            } />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;