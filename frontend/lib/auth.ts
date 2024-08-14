import { BASE } from "@/config";

export async function verifyOrRefreshToken(
  accessToken: string,
  refreshToken: string
): Promise<string | null> {
  try {
    // Make an API call to verify or refresh the token
    const response = await fetch(`${BASE}/api/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data.newAccessToken || null;
  } catch (error) {
    console.error("Error in verifyOrRefreshToken:", error.message);
    return null;
  }
}
