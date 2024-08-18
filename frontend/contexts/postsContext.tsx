"use client";
import { getPosts } from "@/lib/data-service";
import { PostT } from "@/types";
import {
  createContext,
  useContext,
  useEffect,
  useOptimistic,
  useState,
} from "react";

interface PostContextType {
  posts: PostT[];
  isLoading: boolean;
  error: string | null;
  setPosts: React.Dispatch<React.SetStateAction<PostT[]>>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostT[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);
  const updatePosts = (newPosts: PostT[]) => {
    setPosts(newPosts);
  };
  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        error,
        setPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostWrapper");
  }
  return context;
};
