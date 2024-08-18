"use client";
import React, { useRef, useState } from "react";
import LoginButton from "./LoginButton";
import { login } from "@/actions/authActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";

const Login = () => {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const { getUserFromToken, setUser } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (formData: FormData) => {
    setError(null);
    try {
      await login(formData);
      const user = getUserFromToken();
      if (user) {
        toast.success("Login successful!");
        setUser(user);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="w-full max-w-md p-8 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-base-content">Login</h2>
        <form ref={ref} action={handleAction} aria-label="Login form">
          <div className="mb-4">
            <label
              className="block bg-base-200 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
            />
          </div>
          <div className="mb-6">
            <label
              className="block bg-base-200 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
            />
          </div>
          {error && (
            <p className="text-red-500 mb-4" role="alert">
              {error}
            </p>
          )}
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Login;
