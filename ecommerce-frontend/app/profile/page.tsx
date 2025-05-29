"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}` },
        });
        setProfile(res.data);
      } catch {
        router.push("/login");
      }
    };
    if (user) fetchProfile();
  }, [user, router]);

  if (loading || !profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 bg-slate-300 rounded shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
}
