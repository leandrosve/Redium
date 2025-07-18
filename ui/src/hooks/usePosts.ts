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

  const searchTerm = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const baseFilters: PostFilters = useMemo(() => {
    const order = sort === "oldest" ? "asc" : "desc";
    return { searchTerm, order, sortBy: "id", pageSize: 15 };
  }, [searchTerm, sort]);

  const fetchInitial = useCallback(async () => {
    setLoading(true);
    setData([]);
    setError(null);
    const res = await PostService.list({ ...baseFilters, page: 1 });
    setLoading(false);

    if (!res.hasError) {
      setData(res.data);
      setHasMore(res.data.length >= baseFilters.pageSize);
      setPage(2);
    } else {
      setData([]);
      setError(res.error ?? "unknown_error");
    }
  }, [baseFilters]);

  const fetchMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    setError(null);
    const res = await PostService.list({ ...baseFilters, page }, 2000);
    setLoadingMore(false);

    if (!res.hasError) {
      setData((prev) => [...prev, ...res.data]);
      setHasMore(res.data.length >= baseFilters.pageSize);
      setPage((prev) => prev + 1);
    } else {
      setError(res.error ?? "unknown_error");
    }
  }, [baseFilters, page, hasMore, loadingMore]);

  const sortedData = useMemo(() => {
    let copy = [...data];
    copy.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      return baseFilters.order === "asc" ? timeA - timeB : timeB - timeA;
    });
    return copy;
  }, [data, baseFilters.order]);

  const deletePost = useCallback(
    async (id: string) => setData((prev) => prev.filter((c) => c.id !== id)),
    [setData]
  );

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return {
    posts: sortedData,
    sortedData,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchMore,
    deletePost
  };
};

export default usePosts;
