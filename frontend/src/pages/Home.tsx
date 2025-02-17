import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import { Product } from "../types/types";
import useCartStore from "../store/cartStore";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <h3 className="font-bold">{product.name}</h3>
              <p>${product.price}</p>
              <button
                className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;