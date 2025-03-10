"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      login(data.token, { username: data.username });
      alert("Login successful!");
      window.location.href = "/"; // Redirect to homepage
    } else {
      setError(data.errors || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-800 to-pink-500 text-white transition-all duration-500">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-purple-600 dark:bg-purple-700 text-white rounded hover:bg-purple-700 dark:hover:bg-purple-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-900 dark:text-gray-100">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-pink-600 dark:text-pink-300 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
