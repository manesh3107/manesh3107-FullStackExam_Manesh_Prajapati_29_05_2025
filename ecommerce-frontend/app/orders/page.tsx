'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Cookies from 'js-cookie';

type Order = {
  id: number;
  total: number;
  created_at: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');
    api.get('/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setOrders(res.data))
      .catch(() => alert('Failed to load orders'));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 border rounded shadow bg-slate-200">
      <h1 className="text-2xl font-bold mb-6 text-center">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded bg-gray-50 hover:bg-gray-100 transition"
            >
              <p><span className="font-semibold">Order ID:</span> #{order.id}</p>
              <p><span className="font-semibold">Total:</span> ${order.total}</p>
              <p><span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
