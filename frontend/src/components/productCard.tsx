import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useAddToCart } from "../hooks/useAddToCart";
import Card from "./card";
import clsx from "clsx";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const getProductCategory = (product: Product) => product.catagory ?? product.category ?? "Bakery";

const ProductCard = ({ product, className }: { product: Product; className?: string }) => {
  const { added, handleAddToCart } = useAddToCart();
  const navigate = useNavigate();

  const footer = (
    <button
      className='btn btn-primary w-full'
      onClick={() => handleAddToCart(product, 1)}
    >
      <ShoppingBagIcon className="h-5 w-5" />
      {added ? "Added" : "Add to Cart"}
    </button>
  )
  return (
    <Card className={clsx("group flex h-full max-w-sm flex-col p-4", className)} footer={footer} onClick={() => navigate(`/products/${product._id}`)}>
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[var(--color-cream)]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{getProductCategory(product)}</p>
          <h3 className="mt-2 text-lg">{product.name}</h3>
        </div>
        <p className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-sm font-bold text-white">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6">
        {product.description}
      </p>
    </Card>

  );
};

export default ProductCard;
