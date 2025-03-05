import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { Product } from "../types";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    }
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="w-64 my-4" />
      <p>{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  );
};

export default ProductPage;
