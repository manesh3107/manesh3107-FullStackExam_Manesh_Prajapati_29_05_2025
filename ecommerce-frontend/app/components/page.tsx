"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  console.log("Navbar user:", user);

  if (loading) return null; // Optional: Add spinner or skeleton loader here

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white px-6 py-3 flex justify-between items-center rounded-2xl shadow-lg w-[95%] z-50">
      {/* Left side brand */}
      <div className="text-xl font-bold tracking-wide">E-Commerce</div>

      {/* Right side links */}
      <div className="flex space-x-6 items-center">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <Link href="/products" className="hover:underline">
          Products
        </Link>

        {!user ? (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
            <Link href="/orders" className="hover:underline">
              Orders
            </Link>
            <Link href="/reports" className="hover:underline">
              Report
            </Link>
            <Link
              href="/profile"
              className="hover:underline font-semibold bg-blue-800 px-3 py-1 rounded"
            >
              {user.name}
            </Link>
            <button
              onClick={logout}
              className="hover:bg-red-700 bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
