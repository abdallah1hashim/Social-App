export type PublicUserT = {
  user_id: number;
  username: string;
  name: string;
  pfp: string;
};

export type PostT = {
  pk: number;
  author: PublicUserT;
  photo: string | null;
  content: string;
  comments_count: number;
  comment_for: number;
  likes_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
};
