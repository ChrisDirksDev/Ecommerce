import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductCard from "../components/productCard";
import LoadingSpinner from "../components/loadingSpinner";
import { useRequest } from "../hooks/useRequest";
import { MagnifyingGlassIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const getProductCategory = (product: Product) => product.catagory ?? product.category ?? "Bakery";

const categories = ["all", "Bread", "Cakes", "Cupcakes", "Pastries"];

const Products = () => {
  const { data: products, error, loading, execute } = useRequest<Product[]>();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    execute(getProducts);
  }, [execute]);

  useEffect(() => {
    setCategory(searchParams.get("category") ?? "all");
  }, [searchParams]);

  useEffect(() => {
    if (products) {
      let filtered = products;
      if (category !== "all") {
        filtered = filtered.filter((product) => getProductCategory(product) === category);
      }
      if (search) {
        filtered = filtered.filter((product) =>
          `${product.name} ${product.description} ${getProductCategory(product)}`
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }
      setFilteredProducts(filtered);
    }
  }, [products, category, search]);

  return (
    <div className="min-h-[80vh]">
      <div className="header">
        <p className="eyebrow">The bakery case</p>
        <h2 className="mt-3">Shop Sweet Bites</h2>
        <p className="mx-auto mt-3 max-w-2xl">
          Browse small-batch breads, cakes, pastries, and cupcakes with a cleaner commerce experience.
        </p>
      </div>
      <div className="section-shell pt-10">
        <div className="surface-panel flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <label className="relative w-full md:max-w-md">
            <span className="sr-only">Search products</span>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-gray-brown)]" />
            <input
              type="text"
              placeholder="Search bread, cake, pastry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11"
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-ink)]">
              <Squares2X2Icon className="h-5 w-5 text-[var(--color-warm-gold)]" />
              {filteredProducts.length} items
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select cursor-pointer"
              aria-label="Filter by category"
            >
              {categories.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption === "all" ? "All Categories" : categoryOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error ? (
          <p className="text-error text-center mt-8">{error}</p>
        ) : loading ? (
          <div className="flex justify-center mt-6">
            <LoadingSpinner />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} className="w-full" />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-8 p-10 text-center">
            <h3>No products found</h3>
            <p className="mt-2">Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
