"use server";
import { customFetch } from "@/lib/helpers";
import { CreatePostFormSchema } from "@/lib/Validators";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createPostAction(formData: FormData) {
  try {
    console.log(formData);
    const res = await customFetch("api/posts/", "POST", formData);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Failed to create post:", errorData);
      return { errors: { form: errorData.message || "Failed to create post" } };
    }

    const data = await res.json();
    revalidatePath("/home");
    return { success: true, data };
  } catch (error) {
    console.error("Network error:", error);
    return { errors: { form: "Network error. Please try again later." } };
  }
}

export async function toggleLike(postId: number, inc: 1 | -1) {
  try {
    const res = await customFetch(
      `api/posts/${postId}/like/`,
      "PATCH",
      {
        like: inc,
      },
      "no-cache"
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        message: errorData.message || "Failed to toggle like",
      };
    }
    const data = await res.json();
    revalidateTag("posts");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error toggling like:", error.message);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
}
export async function deletePost(postId: number) {
  try {
    const res = await customFetch(`api/posts/${postId}/`, "DELETE");

    if (res.status === 204 || res.ok) {
      revalidateTag("posts");
      return { success: true };
      revalidateTag("posts");
    }
    const errorData = await res.text();
    return {
      success: false,
      message: errorData || "Failed to delete post",
    };
  } catch (error: any) {
    console.error("Error deleting post :", error.message);
    throw new Error("Network error. Please try again later.");
  }
}
