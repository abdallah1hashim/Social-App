"use server";
import { PostT, PublicUserT } from "@/types";
import { customFetch } from "./helpers";

type getPublicUserDataType = {
  error?: string | null;
  user?: PublicUserT;
};

export async function getPublicUserData(
  id: number
): Promise<getPublicUserDataType> {
  try {
    const res = await customFetch(`api.user/${id}/`, "GET", {}, "force-cache", {
      tags: ["user"],
    });
    const data = await res.json();
    return { error: null, user: data };
  } catch (error: any) {
    console.error("Failed to fetch public user data:", error);
    return { error: error.message };
  }
}
export async function getPosts(): Promise<PostT[]> {
  try {
    const res = await customFetch("api/posts/", "GET", undefined, undefined, {
      revalidate: 60 * 10,
      tags: ["posts"],
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return data;
  } catch (error: any) {
    console.error("Failed to fetch posts:", error);
    throw new Error(error?.message || "Failed to fetch posts");
  }
}
async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
