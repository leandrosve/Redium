export interface Post {
  id: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  avatar: string;
  title: string;
  content: string;
  source?: string;
}
