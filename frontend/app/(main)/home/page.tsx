import CreatePost from "./_components/CreatePost";
import Posts from "./_components/Posts";

async function Home() {
  return (
    <div className="relative">
      <CreatePost />
      <Posts />
    </div>
  );
}

export default Home;
