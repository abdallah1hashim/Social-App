"use client";
import { useEffect, useOptimistic, useState } from "react";
import PostButton from "./PostButton";
import { toggleLike } from "@/actions/PostActions";
import toast from "react-hot-toast";
import { PostT } from "@/types";

function PostActions({ post: initialPost }: { post: PostT }) {
  const [optimisticPost, setOptimisticPost] = useState(initialPost);

  const handleLikeToggle = async (inc: 1 | -1) => {
    setOptimisticPost((prev) => ({
      ...prev,
      is_liked: inc === 1,
      likes_count: prev.likes_count + inc,
    }));

    const result = await toggleLike(initialPost.pk, inc);

    if (!result.success) {
      setOptimisticPost((prev) => ({
        ...prev,
        is_liked: inc !== 1,
        likes_count: prev.likes_count - inc,
      }));
      toast.error(result.message || "Failed to toggle like");
    }
  };

  return (
    <div className="flex gap-24 w-full pt-3">
      <PostButton
        variant="like"
        count={optimisticPost.likes_count}
        isLiked={optimisticPost.is_liked}
        onClick={() => handleLikeToggle(optimisticPost.is_liked ? -1 : 1)}
      />
    </div>
  );
}

export default PostActions;
