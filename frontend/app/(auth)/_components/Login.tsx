"use client";
import React, { useRef, useState } from "react";
import LoginButton from "./LoginButton";
import { login } from "@/actions/authActions";
import { useAuthContext } from "@/contexts/authContext";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
const Login = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setAuthTokens } = useAuthContext();

  const handleAction = async (formData: FormData) => {
    ref.current?.reset();
    const result = await login(formData);
    if (result.error) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    if (result.data?.access) {
      const decodedData = result.data.decodedData;
      setAuthTokens(result.data.access, result.data.refresh);
      setUser({
        username: decodedData.username,
        name: decodedData.name,
        user_id: decodedData.user_id,
        pfp: "http://127.0.0.1:8000/" + decodedData.pfp,
      });
    }
    toast.success("Logging...");
    redirect("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="w-full max-w-md p-8 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-base-content">Login</h2>
        <form ref={ref} action={handleAction}>
          <div className="mb-4">
            <label
              className="block bg-base-200 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block bg-base-2000 text-sm font-bold mb-2"
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
            />
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Login;
