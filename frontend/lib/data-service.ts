"use server";
import { BASE } from "@/config";
import { customFetch } from "./helpers";

type UserType = {
  user_id: number;
  name: string;
  pfp: string;
  username: string;
};
type getPublicUserDataType = {
  error?: string | null;
  user?: UserType;
};

export async function getPublicUserData(
  id: number,
  accessToken: string | null,
  refreshToken: string | null
): Promise<getPublicUserDataType> {
  try {
    const { res, newAccess } = await customFetch(
      `api.user/${id}/`,
      accessToken,
      refreshToken,
      "GET",
      {},
      "force-cache",
      {
        tags: ["user"],
      }
    );

    if (newAccess) localStorage.setItem("access", accessToken);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return { error: null, user: data };
  } catch (error: any) {
    console.error("Failed to fetch public user data:", error);
    return { error: error.message };
  }
}
export async function getPosts() {
  try {
    const res = await customFetch("api/posts/");
    const data = await res.json();
    console.log(res);
    return data;
  } catch (error) {
    return error;
  }
}
