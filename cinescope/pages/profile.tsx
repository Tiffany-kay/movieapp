"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Footer from "../components/Footer";

interface UserProfile {
  username: string;
  email: string;
  // Add other user fields as needed
}

export default function Profile() {
  const { isLoggedIn } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: localStorage.getItem("auth-token") || "",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-800 to-pink-500 text-white transition-all duration-500">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Profile</h1>
        {userProfile && (
          <div>
            <p className="text-gray-900 dark:text-white">Username: {userProfile.username}</p>
            <p className="text-gray-900 dark:text-white">Email: {userProfile.email}</p>
            {/* Display other user fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
}
