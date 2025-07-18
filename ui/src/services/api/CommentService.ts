import type { APIResponse } from "@/types/APIResponse";
import type { Comment, CommentCreateRequest } from "@/types/models/Comment";
import type { User } from "@/types/models/User";
import ApiService from "./APIService";

export interface BasicFilters {
  page: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export default class CommentService extends ApiService {
  protected static readonly PATH = `/post`;

  public static list(postId: string): Promise<APIResponse<Comment[]>> {
    return this.get(`/${postId}/comment`);
  }

  public static async create(
    postId: string,
    content: string,
    parentId: string | null | undefined,
    user: User
  ): Promise<APIResponse<Comment>> {
    const req: CommentCreateRequest = {
      content: content,
      parentId: parentId,
      ...user,
      createdAt: new Date().toISOString(),
    };

    return this.post(`/${postId}/comment`, req, { delay: 500 });
  }

  public static async update(
    postId: string,
    commentId: string,
    content: string,
    user: User
  ): Promise<APIResponse<Comment>> {
    const req: Partial<Comment> = {
      content: content,
      ...user,
      updatedAt: new Date().toISOString(),
    };
    return this.put(`/${postId}/comment/${commentId}`, req, { delay: 1000 });
  }

  public static async delete(
    postId: string,
    commentId: string
  ): Promise<APIResponse<boolean>> {
    return this.del(`/${postId}/comment/${commentId}`, { delay: 1000 });
  }
}
