import { addProductToCart } from "../services/cartService";
import { Product } from "../types";

const ProductCard = ({ product }: { product: Product }) => {

  const handleAddToCart = () => {
    addProductToCart(product._id);
  };

  return (
    <div className="flex flex-col border p-4 rounded">
      <h3 className="font-bold">{product.name}</h3>
      <p>${product.price}</p>
      <p className="grow">{product.description}</p>
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain" />
      <h4 className="font-bold">Actions</h4>
      <hr className="my-2" />
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
