"use client";

import { PostT } from "@/types";
import Post, { PostSkeleton } from "./Post";
import { usePostContext } from "@/contexts/postsContext";

export default function Posts() {
  const { posts, isLoading, error } = usePostContext();
  if (isLoading) return <PostSkeleton />;
  if (error)
    return <p className="p-4 m-auto w-fit">{`Something went Wrong :(`}</p>;
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post: PostT) => <Post post={post} key={post.pk} />)
      ) : (
        <p className="p-4 m-auto w-fit">
          Follow someone to see something interesting here
        </p>
      )}
    </div>
  );
}
