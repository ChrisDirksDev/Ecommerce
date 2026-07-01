import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { Product } from "../types";
import LoadingSpinner from "../components/loadingSpinner";
import { useAddToCart } from "../hooks/useAddToCart";
import { useRequest } from "../hooks/useRequest";
import { CheckBadgeIcon, ShieldCheckIcon, ShoppingBagIcon, StarIcon, TruckIcon } from "@heroicons/react/24/solid";

const fakeReviews = [
  { id: 1, rating: 5, comment: "Beautifully packaged and tasted incredibly fresh.", reviewer: "Maya R." },
  { id: 2, rating: 5, comment: "The online order flow was quick and the pastry was excellent.", reviewer: "Evan T." },
  { id: 3, rating: 4, comment: "Great texture, rich flavor, and easy to add to my weekly order.", reviewer: "Sarah L." },
];

const getProductCategory = (product: Product) => product.catagory ?? product.category ?? "Bakery";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { added, handleAddToCart } = useAddToCart();
  const { data: product, loading, error, execute } = useRequest<Product>();

  useEffect(() => {
    if (id) {
      execute(() => getProductById(id));
    }
  }, [id, execute]);

  if (loading) {
    return (
      <div className="flex justify-center mt-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <LoadingSpinner />;
  }

  const averageRating = fakeReviews.reduce((acc, review) => acc + review.rating, 0) / fakeReviews.length;

  return (
    <div className="pb-16">
      <div className="section-shell grid gap-10 pt-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl"
          />
        </div>
        <div className="surface-panel p-6 md:p-8">
          <p className="eyebrow">{getProductCategory(product)}</p>
          <h1 className="mt-3 text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8">{product.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-3xl font-bold text-[var(--color-ink)]">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1 text-[var(--color-warm-gold)]">
              {Array.from({ length: Math.round(averageRating) }).map((_, index) => (
                <StarIcon key={index} className="h-5 w-5" />
              ))}
              <span className="ml-2 text-sm font-semibold text-[var(--color-muted-gray-brown)]">
                {averageRating.toFixed(1)} ({fakeReviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-[10rem_1fr]">
            <label htmlFor="quantity" className="flex flex-col gap-2 text-sm font-bold text-[var(--color-ink)]">
              Quantity
              <select id="quantity" name="quantity" className="select" value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            </label>
            <button className="btn btn-primary self-end" onClick={() => handleAddToCart(product, quantity)}>
              <ShoppingBagIcon className="h-5 w-5" />
              {added ? "Added" : "Add to Cart"}
            </button>
          </div>

          <div className="mt-8 grid gap-3 border-t border-[var(--color-border)] pt-6">
            {[
              { icon: CheckBadgeIcon, label: "Small-batch quality" },
              { icon: TruckIcon, label: "Pickup and delivery-ready checkout" },
              { icon: ShieldCheckIcon, label: "Secure customer account flow" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
                <Icon className="h-5 w-5 text-[var(--color-success)]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="container">
        <div className="surface-panel p-6 md:p-8">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="mt-3">Customer notes</h2>
            </div>
            <p className="text-sm font-semibold">{fakeReviews.length} verified-style reviews</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fakeReviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
                <div className="mb-3 flex items-center gap-1 text-[var(--color-warm-gold)]">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <StarIcon key={index} className="h-4 w-4" />
                  ))}
                </div>
                <p className="text-[var(--color-ink)]">{review.comment}</p>
                <p className="mt-4 text-sm font-bold">- {review.reviewer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
