import type { APIResponse } from "@/types/APIResponse";
import { useCallback, useEffect, useState } from "react";

interface Props<T> {
  fetchFunction: () => Promise<APIResponse<T>>;
  initialFetch?: boolean;
}

const useAPI = <T>({ fetchFunction, initialFetch = true }: Props<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const doFetch = useCallback(
    async (
      fn: () => Promise<APIResponse<T>>,
      transform?: (prev: T | null, newData: T) => T
    ) => {
      setLoading(true);
      setError(null);
      const res = await fn();
      setLoading(false);

      if (res.data) {
        const data = res.data;
        setData(transform ? (p) => transform(p, data) : data);
        return;
      }

      if (res.hasError) {
        setError(res.error ?? "unknown_error");
      }
    },
    []
  );

  const fetchEntity = useCallback(
    () => doFetch(fetchFunction),
    [doFetch, fetchFunction]
  );

  const setEntity = useCallback((entity: T) => setData(entity), []);

  useEffect(() => {
    if (initialFetch) {
      fetchEntity();
    }
  }, [initialFetch]);

  return {
    entity: data,
    loading,
    error,
    fetchEntity,
    setEntity,
  };
};

export default useAPI;
