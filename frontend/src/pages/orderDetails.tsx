import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/order";
import { Order } from "../types";
import { useRequest } from "../hooks/useRequest";
import LoadingSpinner from "../components/loadingSpinner";
import Card from "../components/card";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { data: order, error, loading, execute } = useRequest<Order>();

  useEffect(() => {
    if (orderId) {
      execute(() => getOrderById(orderId));
    }
  }, [execute, orderId]);

  if (loading)
    return (
      <div className="flex justify-center mt-6">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-lg text-danger">
        Error: {error || "Failed to fetch order details."}
      </p>
    );

  if (!order)
    return (
      <p className="text-center text-lg">
        Order not found.
      </p>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="header">
        <h2>Order Details</h2>
      </div>
      <Card className="mt-6" title={`Order #${order._id}}`}>
        <div className="border-b pb-4 mb-4">
          <p className="text-lg">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize text-[var(--color-dark-brown)]">
              {order.status}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Total Price:</span>{" "}
            <span className="text-[var(--color-warm-gold)]">
              ${order.totalPrice.toFixed(2)}
            </span>
          </p>
        </div>

        <h3 className="text-[var(--color-dark-brown)] mb-3">
          Items:
        </h3>

        <ul className="space-y-4">
          {order.items.map((item) => (
            <li
              key={item.product._id}
              className="flex items-center justify-between border p-3 rounded-lg shadow-sm bg-[var(--color-light-beige)]"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p>
                    {item.quantity} x ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-[var(--color-warm-gold)]">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>


      </Card>

    </div>
  );
};

export default OrderDetails;
