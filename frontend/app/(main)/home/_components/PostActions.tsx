"use client";
import { PostT } from "@/types";
import PostButton from "./PostButton";
import { toggleLike } from "@/actions/PostActions";
import toast from "react-hot-toast";

function PostActions({ post }: { post: PostT }) {
  console.log(post.is_liked);
  return (
    <div className="flex gap-24 w-full  pt-3 ">
      <PostButton varriant="comment" count={post.comments_count} />
      <PostButton varriant="repost" count={0} />
      <PostButton
        varriant="like"
        count={post.likes_count}
        isLiked={post.is_liked}
        onClick={async () => {
          const data = await toggleLike(post.pk, 1);
          if (!data.success) {
            toast.error(data.error);
          }
        }}
        secondOncllick={async () => {
          const updatedLikes = await toggleLike(post.pk, -1);
        }}
      />
    </div>
  );
}

export default PostActions;
