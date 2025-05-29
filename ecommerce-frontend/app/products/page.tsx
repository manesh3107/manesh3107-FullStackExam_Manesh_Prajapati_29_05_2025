"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 6; // items per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products", {
          params: {
            page,
            limit,
            search: searchParams.get("search") || "",
            category: searchParams.get("category") || "",
          },
        });

        // ✅ Validate response shape
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-16">
      <h1 className="text-4xl font-bold mb-6 mt-24 text-center bg-slate-400 shadow-lg rounded-md">Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className="border p-4 rounded hover:shadow-lg transition"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-green-700 font-medium">${product.price}</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2 mb-10">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1 rounded ${
              p === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
