"use server";
import { customFetch } from "@/lib/helpers";
import { CreatePostFormSchema } from "@/lib/Validators";

export async function createPostAction(formData: FormData) {
  // Validate content field
  const validatedFields = CreatePostFormSchema.safeParse({
    content: formData.get("content"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  if (
    !formData.has("photo") ||
    (formData.get("photo") instanceof File && formData.get("photo").size === 0)
  ) {
    formData.delete("photo");
  }

  // Append author ID to FormData
  const Authorization = await headerAuth();
  try {
    const res = await fetch("http://127.0.0.1:8000/api/posts/", {
      method: "POST",
      body: formData, // Send FormData directly
      headers: {
        Authorization: Authorization.Authorization,
      },
    });

    if (!res.ok) {
      console.error("Failed to create post:", res.statusText);
      return { errors: { form: "Failed to create post" } };
    }

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Network error:", error);
    return { errors: { form: "Network error" } };
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
    console.log(res);
    return await res.json();
  } catch (error: any) {
    console.error("Error toggling like:", error.message);
    return { success: false, message: error.message };
  }
}
