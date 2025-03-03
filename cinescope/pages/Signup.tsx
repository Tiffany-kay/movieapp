"use client";

import { useState } from "react";
import Link from "next/link";

const Signup = () => {
    // State to manage form input
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    // Handle input changes
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Signup function executed", formData);

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("auth-token", data.token);
                window.location.href = "/";
            } else {
                alert(data.errors || "Signup failed");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-purple-700">
            <div className="w-full max-w-md bg-purple-950 text-white rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gold-500 mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name Input */}
                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={changeHandler}
                        className="h-12 w-full px-4 bg-purple-800 text-white placeholder-gray-300 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    {/* Email Input */}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={changeHandler}
                        className="h-12 w-full px-4 bg-purple-800 text-white placeholder-gray-300 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    {/* Password Input */}
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={changeHandler}
                        className="h-12 w-full px-4 bg-purple-800 text-white placeholder-gray-300 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    {/* Confirm Password Input */}
                    <input
                        name="confirm_password"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={formData.confirm_password}
                        onChange={changeHandler}
                        className="h-12 w-full px-4 bg-purple-800 text-white placeholder-gray-300 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-gold-500 text-purple-900 font-semibold py-2 rounded-md hover:bg-gold-400 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-300">
                    Already have an account?{" "}
                    <Link href="/login" className="text-gold-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
