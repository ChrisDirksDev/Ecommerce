import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductCard from "../components/productCard";
import LoadingSpinner from "../components/loadingSpinner";
import { useRequest } from "../hooks/useRequest";
import {
  ArrowRightIcon,
  CheckBadgeIcon,
  ClockIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const { data: products, error, loading, execute } = useRequest<Product[]>();

  useEffect(() => {
    execute(getProducts);
  }, [execute]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-cream)]">
        <div className="container grid min-h-[72vh] items-center gap-12 py-12 md:grid-cols-[0.95fr_1.05fr] md:py-20">
          <div>
            <p className="eyebrow">Small-batch bakery commerce</p>
            <h1 className="mt-5 max-w-3xl text-[var(--color-ink)]">
              Sweet Bites
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8">
              A polished bakery marketplace for artisan breads, layered cakes, and pastries that feel as good to shop as they taste.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn btn-primary">
                Shop the bakery
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link to="/products?category=Cakes" className="btn btn-secondary">
                Explore cakes
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: CheckBadgeIcon, label: "Curated batches" },
                { icon: ClockIcon, label: "Fresh daily drops" },
                { icon: TruckIcon, label: "Simple checkout" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-white/70 p-4">
                  <Icon className="h-5 w-5 text-[var(--color-warm-gold)]" />
                  <span className="text-sm font-bold text-[var(--color-ink)]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="/products/cake2.jpeg" alt="Chocolate ganache cake" className="aspect-[4/5] w-full rounded-lg object-cover shadow-2xl" />
              <div className="grid gap-4 pt-10">
                <img src="/products/croissant.jpeg" alt="Butter croissant" className="aspect-square w-full rounded-lg object-cover shadow-xl" />
                <img src="/products/bread.jpeg" alt="Artisan sourdough bread" className="aspect-[4/3] w-full rounded-lg object-cover shadow-xl" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 rounded-lg bg-white/95 p-4 shadow-xl backdrop-blur">
              <p className="text-sm font-bold text-[var(--color-ink)]">4.9 average rating</p>
              <p className="text-xs text-[var(--color-muted-gray-brown)]">Portfolio-ready ecommerce flow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Featured selection</p>
            <h2 className="mt-3">Baked to be browsed</h2>
            <p className="mt-3 max-w-2xl">
              A tight product grid with premium imagery, scannable pricing, and clear buying actions.
            </p>
          </div>
          <Link to="/products" className="btn btn-secondary">
            View all products
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-8">
          {error ? (
            <p className="text-error mt-6">{error}</p>
          ) : loading ? (
            <div className="flex justify-center mt-6">
              <LoadingSpinner />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="mt-6">No products found</p>
          )}
        </div>
      </section>

      <section className="bg-[var(--color-ink)] py-16 text-white md:py-24">
        <div className="container grid justify-items-center gap-8 md:grid-cols-3">
          {[
            ["Bread", "Slow-fermented loaves for everyday tables."],
            ["Cakes", "Celebration-ready layers with clean product detail."],
            ["Pastries", "Buttery classics presented for quick discovery."],
          ].map(([title, copy]) => (
            <Link key={title} to={`/products?category=${title}`} className="w-full max-w-sm rounded-lg border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[var(--color-warm-gold)]">
              <SparklesIcon className="h-6 w-6 text-[var(--color-warm-gold)]" />
              <h3 className="mt-6 text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="surface-panel grid gap-8 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <p className="eyebrow">Customer signal</p>
            <h2 className="mt-3">Built for confidence</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <p className="rounded-lg bg-[var(--color-cream)] p-5 text-lg leading-8 text-[var(--color-ink)]">
              “The croissants were beautifully presented and easy to reorder.”
            </p>
            <p className="rounded-lg bg-[var(--color-cream)] p-5 text-lg leading-8 text-[var(--color-ink)]">
              “A bakery storefront that feels boutique, fast, and trustworthy.”
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
