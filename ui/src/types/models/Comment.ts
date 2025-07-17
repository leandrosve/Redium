export interface CommentContent {
  content: string;
}

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  avatar: string;
  content: string;
  parentId?: null | string;
  postId: string;
}

export interface CommentCreateRequest {
  createdAt: string;
  name: string;
  avatar: string;
  content: string;
  parentId?: null | string;
}

export interface CommentNode extends Comment {
  children: CommentNode[];
}