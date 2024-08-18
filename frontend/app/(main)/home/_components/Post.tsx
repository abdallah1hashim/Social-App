import Avatar from "@/app/_components/Avatar";
import { PostT } from "@/types";
import Image from "next/image";
import PostActions from "./PostActions";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import Menu, { MenuList } from "@/app/_components/Menu";
import { deletePost } from "@/actions/PostActions";
import toast from "react-hot-toast";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { usePostContext } from "@/contexts/postsContext";

type PostProps = {
  post: PostT;
};

function Post({ post }: PostProps) {
  const { user } = useAuthContext();
  const { setPosts } = usePostContext();
  const router = useRouter();

  const postMenu: MenuList = [
    {
      content: "Delete",
      onClick: async () => {
        try {
          const result = await deletePost(post.pk);
          if (result.success) {
            toast.success("Post deleted");
            setPosts((prevPosts) => prevPosts.filter((p) => p.pk !== post.pk));
          } else {
            toast.error(result.message || "Failed to delete post");
          }
        } catch (error) {
          console.error("Error deleting post:", error);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      },
      className: "text-red-500",
      permission: post.author.id === user?.id,
    },
  ];
  return (
    <div className="px-[16px] p-1 flex border border-base-200 ">
      <div>
        <Avatar pfp={post.author.pfp} className="pt-3" />
      </div>

      <div className="pl-4 w-full py-1 relative">
        <div className="flex align-center gap-1">
          <span className="my-auto">{post.author.name || "NAME"}</span>
          <span className="my-auto text-base-content/30">
            @{post.author.username}
          </span>
          <Menu
            position="topEnd"
            className="ml-auto "
            Button={
              <span className=" my-auto text-base-content/30 hover:cursor-pointer hover:bg-blue-500/20 rounded-full">
                <EllipsisHorizontalIcon className="size-10 p-2" />
              </span>
            }
            list={postMenu}
          />
        </div>
        <div className="flex flex-col justify-center mt-1 ">
          <p>{post.content}</p>
          {post.photo && (
            <div className="py-3">
              <Image
                className="rounded-2xl w-full h-auto"
                src={post.photo}
                alt="post_media"
                width={500}
                height={0}
                sizes="100vw"
              />
            </div>
          )}
        </div>
        <PostActions post={post} />
      </div>
    </div>
  );
}

export default Post;

const PostSkeletonItem = () => (
  <div className="px-[16px] p-1 flex border border-base-200 animate-pulse">
    <div>
      <div className="pt-3 h-[40px] w-[40px] bg-base-200 rounded-full"></div>
    </div>

    <div className="pl-4 w-full py-3">
      <div className="flex gap-1">
        <div className="h-[20px] w-[100px] bg-base-200 rounded-full"></div>
        <div className="h-[20px] w-[80px] bg-base-200 rounded-full"></div>
      </div>
      <div className="flex flex-col justify-center mt-2">
        <p className="h-[16px] w-full bg-base-200 rounded-full"></p>
        <p className="h-[16px] w-3/4 bg-base-200 rounded-full mt-2"></p>
      </div>
      <div className="h-[20px] w-[120px] bg-base-200 rounded-full mt-3"></div>
    </div>
  </div>
);

export const PostSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeletonItem key={index} />
      ))}
    </>
  );
};
