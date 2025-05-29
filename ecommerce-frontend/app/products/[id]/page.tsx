'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Cookies from 'js-cookie';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => alert('Failed to load product'));
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post('/cart', { productId: id }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      alert('Added to cart!');
    } catch {
      alert('Login required or error adding to cart');
      router.push('/login');
    }
  };

  if (!product) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded shadow bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-contain mb-6 rounded"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>
      <button
        onClick={addToCart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
