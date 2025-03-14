import { useEffect } from "react";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductCard from "../components/productCard";
import LoadingSpinner from "../components/loadingSpinner";
import { useRequest } from "../hooks/useRequest";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: products, error, loading, execute } = useRequest<Product[]>();

  useEffect(() => {
    execute(getProducts);
  }, [execute]);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full h-[50vh] text-center md:text-left px-6 md:px-16 bg-[var(--color-warm-gold)]">
        {/* Text Content */}
        <div className="max-w-lg">
          <h1 className="text-5xl text-[var(--color-dark-brown)]">Welcome to Sweet Bites!</h1>
          <p className="mt-4 text-lg text-[var(--color-muted-gray-brown)] mb-6">
            Delicious, handcrafted treats made with love. Try our freshly baked pastries today!
          </p>
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>

        </div>

        {/* Mascot Image */}
        <div className="mt-8 md:mt-0 md:ml-12">
          <img
            src="/src/assets/pngwing.com.png" // Replace with actual mascot image path
            alt="Bakery Mascot"
            className="w-60 md:w-80"
          />
        </div>
      </section>


      {/* Products Section */}
      <section className="container text-center mt-12 py-12">
        {/* Section Header */}
        <h2 className="text-4xl text-[var(--color-dark-brown)] flex items-center justify-center gap-3">
          <span>🍰</span> Featured Products <span>🍪</span>
        </h2>
        <p className="mt-2 text-[var(--color-muted-gray-brown)]">
          Our Best-Selling Treats – Freshly Baked Just for You!
        </p>

        {/* Product Grid with Subtle Background */}
        <div className="bg-white/80 p-6 rounded-xl mt-6 shadow-inner">
          {error ? (
            <p className="text-error mt-6">{error}</p>
          ) : loading ? (
            <div className="flex justify-center mt-6">
              <LoadingSpinner />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} className="hover:scale-105 hover:shadow-xl transition-transform" />
              ))}
            </div>
          ) : (
            <p className="mt-6">No products found</p>
          )}
        </div>
      </section>



      {/* Customer Reviews Section */}
      <section className="container text-center mt-24 mb-32">
        <h2 className="text-4xl text-[var(--color-dark-brown)] flex items-center justify-center gap-3">
          ⭐ What Our Customers Are Saying ⭐
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Review Card 1 */}
          <div className="bg-[var(--color-soft-pink)] p-6 rounded-xl shadow-md">
            <p className="text-xl font-light">
              <span className="text-4xl font-bold">“</span>
              The best bakery in town! Their croissants are amazing!
              <span className="text-4xl font-bold">”</span>
            </p>
            <span className="block mt-4 text-[var(--color-muted-gray-brown)] font-medium">- Sarah J.</span>
          </div>

          {/* Review Card 2 */}
          <div className="bg-[var(--color-soft-blue)] p-6 rounded-xl shadow-md">
            <p className="text-xl font-light">
              <span className="text-4xl font-bold">“</span>
              Fresh, delicious, and always on time. Highly recommend!
              <span className="text-4xl font-bold">”</span>
            </p>
            <span className="block mt-4 text-[var(--color-muted-gray-brown)] font-medium">- John D.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
