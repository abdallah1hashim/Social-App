import { BASE } from "@/config";
import { cookies } from "next/headers";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export const customFetch = async (
  endpoint: string,
  method: Method = "GET",
  body?: FormData | Record<string, any>,
  cache?: RequestCache,
  next?: NextFetchRequestConfig
): Promise<Response> => {
  let headers: HeadersInit = {};

  // Get the access token from the cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access")?.value;

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Only set Content-Type if body is not FormData
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
    cache: cache,
    next: next,
  };

  const res = await fetch(`${BASE}${endpoint}`, options);
  return res;
};
