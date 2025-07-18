import type { APIResponse } from "@/types/APIResponse";
import type { Post, PostContent } from "@/types/models/Post";
import type { User } from "@/types/models/User";

export interface PostFilters {
  page?: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export default class PostService {
  private static readonly BASE_URL = `https://665de6d7e88051d60408c32d.mockapi.io/post`;

  // Only for testing
  private static async sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  private static buildFilterParams(filters?: PostFilters): string {
    if (!filters) return "";
    const params = new URLSearchParams();

    const map: Record<keyof PostFilters, string> = {
      page: "page",
      pageSize: "limit",
      searchTerm: "search",
      sortBy: "sortBy",
      order: "order",
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const paramKey = map[key as keyof PostFilters];
        if (paramKey) {
          params.append(paramKey, String(value));
        }
      }
    });

    return params.toString();
  }

  public static async list(
    filters?: PostFilters,
    delay?: number // Para facilitar el delay en el infinite scroll
  ): Promise<APIResponse<Post[]>> {
    if (delay) await this.sleep(delay);

    const res = await fetch(
      `${this.BASE_URL}?${this.buildFilterParams(filters)}`
    );

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

    const posts: Post[] = await res.json();

    return {
      hasError: false,
      data: posts,
    };
  }

  public static async detail(id: string): Promise<APIResponse<Post>> {
    const res = await fetch(`${this.BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      let error = "api_error";
      if (text == '"Not found"') error = "not_found";
      return {
        hasError: true,
        error: error,
      };
    }

    const data: Post = await res.json();

    return {
      hasError: false,
      data,
    };
  }

  public static async create(
    post: PostContent,
    user: User
  ): Promise<APIResponse<Post>> {
    const req = { ...post, ...user, createdAt: new Date().toISOString() };

    const res = await fetch(this.BASE_URL, {
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

    const data: Post = await res.json();

    return {
      hasError: false,
      data,
    };
  }

  public static async update(
    postId: string,
    post: PostContent,
    user: User
  ): Promise<APIResponse<Post>> {
    const req: Partial<Post> = {
      ...post,
      ...user,
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${this.BASE_URL}/${postId}`, {
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

    const data: Post = await res.json();

    return {
      hasError: false,
      data,
    };
  }

  public static async delete(postId: string): Promise<APIResponse<boolean>> {
    const res = await fetch(`${this.BASE_URL}/${postId}`, {
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
