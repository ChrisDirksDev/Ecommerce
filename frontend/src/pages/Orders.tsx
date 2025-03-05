import { Link } from "react-router-dom";
import { useEffect } from "react";
import useOrderStore from "../store/orderStore";
import { fetchOrders } from "../services/orderService";

const Orders = () => {

  const { orders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <Link to={`/orders/${order._id}`}>
                Order #{order._id} - {order.status} - ${order.totalPrice}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
