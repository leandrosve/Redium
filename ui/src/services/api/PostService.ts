import type { APIResponse } from "@/types/APIResponse";
import type { Post, PostContent } from "@/types/models/Post";
import type { User } from "@/types/models/User";
import ApiService from "./APIService";

export interface PostFilters {
  page?: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export default class PostService extends ApiService {
  protected static readonly PATH = `/post`;

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

  public static list(
    filters?: PostFilters,
    delay?: number // Para facilitar el delay en el infinite scroll
  ): Promise<APIResponse<Post[]>> {
    return this.get("", this.buildFilterParams(filters), { delay });
  }

  public static detail(id: string): Promise<APIResponse<Post>> {
    return this.get(`/${id}`);
  }

  public static create(post: PostContent, user: User): Promise<APIResponse<Post>> {
    const req = { ...post, ...user, createdAt: new Date().toISOString() };

    return this.post("", req);
  }

  public static update(postId: string, post: PostContent, user: User): Promise<APIResponse<Post>> {
    const req: Partial<Post> = {
      ...post,
      ...user,
      updatedAt: new Date().toISOString(),
    };

    return this.put(`/${postId}`, req);
  }

  public static delete(postId: string): Promise<APIResponse<void>> {
    return this.del(`/${postId}`);
  }
}
