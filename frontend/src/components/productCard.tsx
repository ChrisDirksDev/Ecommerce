import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useAddToCart } from "../hooks/useAddToCart";
import Card from "./card";
import clsx from "clsx";

const ProductCard = ({ product, className }: { product: Product, className?: string }) => {
  const { added, handleAddToCart } = useAddToCart();
  const navigate = useNavigate();

  const footer = (
    <button
      className='btn btn-primary'
      onClick={() => handleAddToCart(product, 1)}
    >
      {added ? "Added" : "Add to Cart"}
    </button>
  )
  return (
    <Card className={clsx("text-center", className)} title={product.name} footer={footer} onClick={() => navigate(`/products/${product._id}`)}>
      <h3>${product.price}</h3>
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain" />
    </Card>

  );
};

export default ProductCard;
