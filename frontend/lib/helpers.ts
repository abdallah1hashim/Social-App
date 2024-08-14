import { BASE } from "@/config";
import { verifyOrRefreshToken } from "./auth";
import { cookies } from "next/headers";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export const headerAuth = async (
  access: string | null,
  refresh: string | null
): Promise<{ Authorization?: string } | {}> => {
  try {
    if (!access || !refresh) throw new Error("Access Token not found");
    const newAccessToken = await verifyOrRefreshToken(access, refresh);
    if (!newAccessToken) {
      throw new Error("Failed to obtain new access token.");
    }
    const returnAccess = access === newAccessToken ? access : newAccessToken;

    return { Authorization: `Bearer ${returnAccess}` };
  } catch (error: any) {
    console.error("Error in headerAuth:", error.message);
    return {};
  }
};

export const customFetch = async (
  endpoint: string,
  method: Method = "GET",
  body?: FormData | Record<string, any>,
  cache?: RequestCache,
  next?: NextFetchRequestConfig
): Promise<Response> => {
  const cookies = headers().get("cookie") || "";
  console.log(cookies);

  const res = await fetch(`${BASE}${endpoint}`, {
    method,
    body: body && body instanceof FormData ? body : JSON.stringify(body),
    headers: {
      ...(body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      Cookie: cookies, // Pass cookies in the request header
    },
    cache: cache,
    next: next,
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res;
};
