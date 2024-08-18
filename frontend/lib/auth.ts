import { BASE } from "@/config";
import { setCache, getCache } from "./cache";

export async function verifyOrRefreshToken(
  accessToken: string,
  refreshToken: string
): Promise<string | null> {
  try {
    const isVerified = await verifyTokenFunc(accessToken);
    if (isVerified?.success) return accessToken;
    return await refreshTokenFunc(refreshToken);
  } catch (error) {
    console.error(
      "Error in verifyOrRefreshToken:",
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}

async function verifyTokenFunc(
  accessToken: string
): Promise<{ success: boolean } | null> {
  const cacheKey = `verify-token-${accessToken.slice(-6)}`;
  const cachedResult = getCache(cacheKey);
  if (cachedResult !== null) {
    return cachedResult;
  }

  try {
    const response = await fetch(`${BASE}api/token/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: accessToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to verify token: ${response.statusText}`);
    }
    const result = { success: true };
    setCache(cacheKey, result, 5 * 60);
    return result;
  } catch (error) {
    console.error(
      "Error in verifyToken:",
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}

async function refreshTokenFunc(refreshToken: string) {
  try {
    const response = await fetch(`${BASE}api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Refresh response error: ${errorText}`);
      throw new Error("couldn't refresh token");
    }
    const data = await response.json();
    return data.access;
  } catch (error: any) {
    console.error("Error in refreshToken:", error.message);
    return null;
  }
}
