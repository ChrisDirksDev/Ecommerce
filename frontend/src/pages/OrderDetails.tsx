import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../utils/api";
import { Order } from "../types/types";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId).then(setOrder);
    }
  }, [orderId]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div>
      <h2>Order #{order._id}</h2>
      <p>Status: {order.status}</p>
      <p>Total Price: ${order.totalPrice}</p>

      <h3>Items:</h3>
      <ul>
        {order.items.map((item) => (
          <li key={item.product._id}>
            {item.product.name} - {item.quantity} x ${item.product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
