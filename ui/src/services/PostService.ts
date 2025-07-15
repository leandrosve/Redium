import type { APIResponse } from "@/types/APIResponse";
import type { Post } from "@/types/models/Post";
import { mockedPosts } from "./mockData";

interface PostFilters {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export default class PostService {
  private static readonly BASE_URL = `https://665de6d7e88051d60408c32d.mockapi.io/post`;

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
    filters?: PostFilters
  ): Promise<APIResponse<Post[]>> {

    return {hasError: false, data: mockedPosts}
    const res = await fetch(
      `${this.BASE_URL}?${this.buildFilterParams(filters)}`
    );

    if (!res.ok) {
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
}
