"use server";

import { BASE } from "@/config";
import { createSession } from "@/lib/session";
import { PublicUserT } from "@/types";
import { jwtDecode, JwtPayload } from "jwt-decode";

type Payload = JwtPayload & PublicUserT;

type LoginResponse = {
  error?: string | null | undefined;
  data?: {
    access: string;
    refresh: string;
    decodedData: Payload;
  };
};

export const login = async (formData: FormData): Promise<LoginResponse> => {
  try {
    // 1. Login
    const res = await fetch(`${BASE}api/token/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.detail || "Login failed" };
    }

    const { access, refresh } = await res.json();
    if (!access || !refresh) {
      throw new Error("Authorization failed: Missing tokens");
    }

    const decodedData: Payload = jwtDecode(access);

    if (!decodedData?.user_id) {
      return { error: "Invalid token payload" };
    }

    // 3. Create Session
    await createSession(decodedData.user_id);
    if (!access) {
      throw new Error("Faild to obtain Token");
    }

    return { data: { access, refresh, decodedData } };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
};
