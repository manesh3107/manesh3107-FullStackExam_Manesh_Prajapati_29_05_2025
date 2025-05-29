"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function AnalyticsPage() {
  const [topSpenders, setTopSpenders] = useState([]);
  const [categorySales, setCategorySales] = useState([]);

  useEffect(() => {
    api.get("/reports/top-spenders").then((res) => setTopSpenders(res.data));
    api.get("/reports/sales-by-category").then((res) =>
      setCategorySales(res.data)
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">📊 Analytics Dashboard</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">🏆 Top Spenders</h2>
        <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {topSpenders.map((user: any, index: number) => (
            <li key={index} className="p-4 flex justify-between">
              <span>{user.name}</span>
              <span className="font-semibold text-green-600">${user.spent}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-purple-700">🛍️ Sales by Category</h2>
        <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {categorySales.map((category: any, index: number) => (
            <li key={index} className="p-4 flex justify-between">
              <span>{category._id}</span>
              <span className="font-semibold text-blue-600">{category.total} sales</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
