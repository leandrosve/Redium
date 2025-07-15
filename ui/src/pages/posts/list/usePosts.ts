import PostService, { type PostFilters } from "@/services/PostService";
import type { Post } from "@/types/models/Post";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePosts = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams] = useSearchParams();

  const baseFilters: PostFilters = useMemo(() => {
    const searchTerm = searchParams.get("q") ?? "";
    const sort = searchParams.get("sort") ?? "";
    const order = sort === "newest" ? "desc" : "asc";
    return { searchTerm, order, sortBy: "id", pageSize: 10 };
  }, [searchParams]);

  const fetchInitial = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await PostService.list({ ...baseFilters, page: 1 });
    setLoading(false);

    if (!res.hasError) {
      setData(res.data);
      setHasMore(res.data.length >= baseFilters.pageSize);
      setPage(2);
    } else {
      setError(res.error ?? "unknown_error");
    }
  }, [baseFilters]);

  const fetchMore = useCallback(async () => {
    console.log("FETCH MORE", page, hasMore, loadingMore, baseFilters)
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    setError(null);
    const res = await PostService.list({ ...baseFilters, page });
    setLoadingMore(false);

    if (!res.hasError) {
      setData((prev) => [...prev, ...res.data]);
      setHasMore(res.data.length >= baseFilters.pageSize);
      setPage((prev) => prev + 1);
    } else {
      setError(res.error ?? "unknown_error");
    }
  }, [baseFilters, page, hasMore, loadingMore]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return {
    posts: data,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchMore,
  };
};

export default usePosts;
