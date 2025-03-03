"use client";

import { useState } from "react";
import Link from "next/link";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("auth-token", data.token);
                window.location.href = "/";
            } else {
                setError(data.errors || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md bg-purple-950 dark:bg-gray-900 text-white rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gold-500 mb-6">Login</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={changeHandler}
                        className="h-12 w-full px-4 bg-purple-800 text-white placeholder-gray-300 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={changeHandler}
                        className="h-12 w-full px-4 bg-purple-800 text-white placeholder-gray-300 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    <button
                        type="submit"
                        className={`mt-4 w-full bg-gold-500 text-purple-900 font-semibold py-2 rounded-md transition duration-200 ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gold-400"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-300">
                    Don&apos;t have an account?{" "}
                    <Link href="/Signup" className="text-gold-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
