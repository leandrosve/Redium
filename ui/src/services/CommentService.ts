import type { APIResponse } from "@/types/APIResponse";
import type { Comment, CommentCreateRequest } from "@/types/models/Comment";
import type { User } from "@/types/models/User";

export interface BasicFilters {
  page: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export default class CommentService {
  private static readonly BASE_URL = `https://665de6d7e88051d60408c32d.mockapi.io/post`;

  // Only for testing
  private static async sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  public static async list(postId: string): Promise<APIResponse<Comment[]>> {
    // Este sleep es solo para que no pegue un salto cuando carga demasiado rapido
    await this.sleep(1000);
    const res = await fetch(`${this.BASE_URL}/${postId}/comment`);

    if (!res.ok) {
      const text = await res.text();
      if (text == '"Not found"') {
        return { hasError: false, data: [] };
      }
      return {
        hasError: true,
        error: "api_error",
      };
    }

    const comments: Comment[] = await res.json();

    return {
      hasError: false,
      data: comments,
    };
  }

  public static async create(
    postId: string,
    content: string,
    parentId: string | null | undefined,
    user: User
  ): Promise<APIResponse<Comment>> {
    // Este sleep es solo para que no pegue un salto cuando carga demasiado rapido
    await this.sleep(1000);

    const req: CommentCreateRequest = {
      content: content,
      parentId: parentId,
      ...user,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch(`${this.BASE_URL}/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      return {
        hasError: true,
        error: "api_error",
      };
    }

    const data: Comment = await res.json();

    return {
      hasError: false,
      data,
    };
  }

  public static async update(
    postId: string,
    commentId: string,
    content: string,
    user: User
  ): Promise<APIResponse<Comment>> {
    // Este sleep es solo para que no pegue un salto cuando carga demasiado rapido
    await this.sleep(1000);

    const req: Partial<Comment> = {
      content: content,
      ...user,
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${this.BASE_URL}/${postId}/comment/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      return {
        hasError: true,
        error: "api_error",
      };
    }

    const data: Comment = await res.json();

    return {
      hasError: false,
      data,
    };
  }

  public static async delete(
    postId: string,
    commentId: string
  ): Promise<APIResponse<boolean>> {
    // Este sleep es solo para que no pegue un salto cuando carga demasiado rapido
    await this.sleep(2000);

    const res = await fetch(`${this.BASE_URL}/${postId}/comment/${commentId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return {
        hasError: true,
        error: "api_error",
      };
    }

    return {
      hasError: false,
      data: true,
    };
  }
}
