import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import { useRequest } from '../hooks/useRequest';
import { useEffect } from 'react';
import { getOrderById } from '../api/order';
import { Order } from '../types';
import Card from '../components/card';
import LoadingSpinner from '../components/loadingSpinner';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { data: order, loading, error, execute } = useRequest<Order>();

  useEffect(() => {
    if (orderId) {
      execute(() => getOrderById(orderId));
    }
  }, [execute, orderId]);

  if (loading) {
    return (
      <div className="flex justify-center mt-6">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl text-center">
        <h2 className="text-2xl font-semibold mb-2 text-danger">Error loading order</h2>
        <p className="text-lg mb-6">{error}</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/orders"
            className="btn btn-primary px-4 py-2 rounded text-white"
          >
            Retry
          </Link>
        </div>
      </div>
    );
  }

  if (!order)
    return (
      <p className="text-center text-lg ">
        Order not found.
      </p>
    );

  return (
    <div className='max-w-3xl mx-auto text-center'>
      <Card>
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="h-16 w-16 text-[var(--color-warm-gold)]" />
        </div>
        <h2 className="mb-2">Thank You for Your Order!</h2>
        <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully.</p>

        <div className="border-t pt-4 mt-4">
          <p className="text-lg font-medium">Order {orderId}</p>
          <p className="text-[var(--color-warm-gold)] font-semibold">Total: ${order.totalPrice.toFixed(2)}</p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="btn btn-primary"
          >
            View My Orders
          </Link>
          <Link
            to="/products"
            className="btn btn-primary-inverse"
          >
            Continue Shopping
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
