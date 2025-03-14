import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useOrderStore from "../store/orderStore";
import { fetchOrders } from "../services/orderService";
import Card from "../components/card";

const Orders = () => {

  const { orders } = useOrderStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="header">
        <h2 >My Orders</h2>
      </div>
      <div className=" p-6 max-w-4xl mx-auto">
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card className="hover:scale-110 hover:shadow-2xl" key={order._id} title={`Order #${order._id}`} onClick={() => navigate(`/orders/${order._id}`)} footer={`Total: $${order.totalPrice.toFixed(2)}`}>
                <p className="mb-2">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>
              </Card>

            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
