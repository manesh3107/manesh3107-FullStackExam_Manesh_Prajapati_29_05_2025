"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CartPage() {
  type CartItem = {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  };

  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(async (res) => {
        const cartItems = res.data.items || [];

        const itemsWithProduct = await Promise.all(
          cartItems.map(async (item: any) => {
            if (!item.productId) return null;
            try {
              const productRes = await api.get(`/products/${item.productId}`);
              return {
                product: productRes.data,
                quantity: item.quantity || 1,
              };
            } catch {
              return null;
            }
          })
        );

        setItems(itemsWithProduct.filter(Boolean));
      })
      .catch(() => alert("Please login first"));
  }, []);

const checkout = async () => {
  try {
    console.log(Cookies.get("token"));
    await api.post(
      "/orders/checkout",
      {}, // <-- empty body
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    alert("Order placed!");
    router.push("/orders");
  } catch (error) {
    console.error(error);
    alert("Checkout failed");
  }
};

  if (items.length === 0)
    return <p className="text-center text-gray-600 mt-20 text-lg">🛒 Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 mt-16 text-center text-gray-800">🛒 Your Cart</h1>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
          >
            {item.product ? (
              <>
                <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
                <p className="text-gray-600">
                  <span className="font-medium text-blue-600">${item.product.price}</span> ×{" "}
                  <span className="font-medium">{item.quantity}</span>
                </p>
              </>
            ) : (
              <p className="text-red-500">Invalid product data</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={checkout}
        className="block w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-6 mt-6 rounded-xl shadow-md transition duration-200"
      >
        ✅ Proceed to Checkout
      </button>
    </div>
  );
}
