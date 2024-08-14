import Avatar from "@/app/_components/Avatar";
import { PostT } from "@/types";
import Image from "next/image";
import PostActions from "./PostActions";

type PostProps = {
  post: PostT;
};

function Post({ post }: PostProps) {
  return (
    <div className="px-[16px] p-1 flex border border-base-200 ">
      <div>
        <Avatar pfp={post.author.pfp} className="pt-3" />
      </div>

      <div className="pl-4 w-full py-3">
        <div className="flex gap-1">
          <span>{post.author.name || "NAME"}</span>
          <span className="text-base-content/30">@{post.author.username}</span>
        </div>
        <div className="flex flex-col justify-center ">
          <p>{post.content}</p>
          {post.photo && (
            <div className="py-3">
              <img className="rounded-2xl" src={post.photo} alt="post_media" />
            </div>
          )}
        </div>
        <PostActions post={post} />
      </div>
    </div>
  );
}

export default Post;
