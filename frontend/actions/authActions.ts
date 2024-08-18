"use server";

import { BASE } from "@/config";
import { createSession, setTokens } from "@/lib/session";
import { Payload, PublicUserT } from "@/types";
import { jwtDecode, JwtPayload } from "jwt-decode";

type LoginResponse = {
  data?: {};
};

export const login = async (formData: FormData): Promise<void> => {
  try {
    // 1. Login
    const res = await fetch(`${BASE}api/token/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const { access, refresh } = await res.json();
    if (!access || !refresh) {
      throw new Error("Authorization failed: Missing tokens");
    }
    setTokens(access, refresh);

    const decodedData: Payload = jwtDecode(access);

    if (!decodedData?.id) {
      throw new Error("Invalid token payload");
    }

    // 3. Create Session
    await createSession(decodedData.id);
    if (!access) {
      throw new Error("Faild to obtain Token");
    }
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
