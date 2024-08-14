"use client";
import { deleteSession } from "@/lib/session";
import { PublicUserT } from "@/types";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  user: PublicUserT | null;
  setUser: (user: PublicUserT | null) => void;
  logout: () => void;
  setAuthTokens: (accessToken: string, refreshToken: string) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<PublicUserT | null>(null);
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access");
    const storedRefreshToken = localStorage.getItem("refresh");
    const storedUser = localStorage.getItem("user");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  const setAuthTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
  };
  const logout = async () => {
    await deleteSession();
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAuthTokens,
        user,
        setUser,
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
