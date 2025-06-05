export type UserData = {
  email: string;
  username: string;
  full_name: string;
  id: string;
  avatar_url: string;
  bio: string | null;
  updated_at: string;
}; 

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
}
