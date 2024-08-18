"use client";
import { deleteSession } from "@/lib/session";
import { Payload, PublicUserT } from "@/types";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type AuthContextType = {
  user: PublicUserT | null;
  setUser: (user: PublicUserT | null) => void;
  getUserFromToken: () => PublicUserT | null;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<PublicUserT | null>(null);
  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      setUser(user);
    }
  }, []);
  const getUserFromToken = (): PublicUserT | null => {
    const storedAccessToken = Cookies.get("access");

    if (!storedAccessToken) return null;

    try {
      const decodedData: Payload = jwtDecode(storedAccessToken);
      return {
        username: decodedData.username,
        name: decodedData.name,
        id: decodedData.id,
        pfp: `http://localhost:8000/${decodedData.pfp}`,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  const logout = async () => {
    await deleteSession();
    router.push("/login");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        getUserFromToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthWrapper");
  }
  return context;
}
