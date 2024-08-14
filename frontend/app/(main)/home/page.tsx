"use server";
import { getPosts } from "@/lib/data-service";
import CreatePost from "./_components/CreatePost";
import Post from "./_components/Post";
import { PostT } from "@/types";

async function Home() {
  const posts: PostT[] = await getPosts();
  return (
    <div className="">
      <CreatePost />
      {posts.length > 0 ? (
        posts?.map((post: PostT) => <Post post={post} key={post.pk} />)
      ) : (
        <p className="p-4 m-auto w-fit">
          Follow someone to see somthing interesting here
        </p>
      )}
    </div>
  );
}

export default Home;
