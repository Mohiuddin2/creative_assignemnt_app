"use client";

import { useState } from "react";
import { googleSignIn } from "../lib/serverActions";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Example: Call your backend API for authentication
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-600 to-teal-800">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Sign in to continue</p>

        {/* Google Sign-In */}
        <form action={googleSignIn}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg shadow-md hover:bg-teal-200 transition-all duration-300 mb-4"
          >
            <FcGoogle size={24} />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="absolute bg-white px-2 text-gray-500">OR</span>
        </div>

        {/* Manual Sign-In Form */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-800 bg-slate-300 text-black"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-teal-300 focus:outline-none focus:ring-2 focus:ring-blue-800 pr-12 bg-slate-300 text-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute  inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full btn btn-accent text-white font-medium py-3 rounded-lg hover:bg-teal-200 transition-all hover:text-black duration-300"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
}
