import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { Product } from "../types";
import LoadingSpinner from "../components/loadingSpinner";
import { useAddToCart } from "../hooks/useAddToCart";
import { useRequest } from "../hooks/useRequest";

const fakeReviews = [
  { id: 1, rating: 5, comment: "Amazing product! Exceeded my expectations.", reviewer: "John D." },
  { id: 2, rating: 4, comment: "Very good, but the delivery was a bit slow.", reviewer: "Sarah L." },
  { id: 3, rating: 3, comment: "It’s okay. The quality is decent for the price.", reviewer: "Michael P." },
  { id: 4, rating: 2, comment: "Not as expected, could be improved.", reviewer: "Emily R." },
  { id: 5, rating: 5, comment: "Perfect, I would buy again! Highly recommend.", reviewer: "Chris W." },
];

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
      <div className="p-4 text-danger">s
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <LoadingSpinner />;
  }

  const averageRating = fakeReviews.reduce((acc, review) => acc + review.rating, 0) / fakeReviews.length;

  return (
    <div>
      <div className="header">
        <h2>
          {product.name}
        </h2>
      </div>
      <div className="container flex flex-col lg:flex-row p-4">
        <div className="flex-1 mb-4 lg:mb-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="mb-4 mt-12 text-gray-700">{product.description}</p>
          <p className="font-bold text-xl mb-2">${product.price}</p>
          <p className="text-yellow-500 mb-4">
            {Array(Math.floor(averageRating)).fill("★").join("")}
            {Array(5 - Math.floor(averageRating)).fill("☆").join("")} ({fakeReviews.length} reviews)
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">Quantity:</label>
            <select id="quantity" name="quantity" className="border px-2 py-1 rounded" value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <button className="mt-4 btn btn-primary" onClick={() => handleAddToCart(product, quantity)}>
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>

        {/* Fake Reviews Section */}
        <div className="mt-8 lg:mt-16">
          <h3 className=" mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {fakeReviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <p className="font-bold mr-2">{review.reviewer}</p>
                  <p className="text-yellow-500">
                    {Array(review.rating).fill("★").join("")}
                    {Array(5 - review.rating).fill("☆").join("")}
                  </p>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
