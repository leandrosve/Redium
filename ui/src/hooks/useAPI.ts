import type { APIResponse } from "@/types/APIResponse";
import { useCallback, useEffect, useState } from "react";

interface Props<T> {
  fetchFunction: () => Promise<APIResponse<T>>;
  initialFetch?: boolean;
}

const useFetchAPI = <T>({
  fetchFunction,
  initialFetch = true,
}: Props<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const doFetch = useCallback(
    async (fn: () => Promise<APIResponse<T>>) => {
      setLoading(true);
      setError(null);
      const res = await fn();
      setLoading(false);

      if (res.data) {
        setData(res.data);
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

  const fetchOther = useCallback(
    (otherFetchFunction: () => Promise<APIResponse<T>>) =>
      doFetch(otherFetchFunction),
    [doFetch]
  );

  const setEntity = useCallback((entity: T) => setData(entity), []);

  useEffect(() => {
    if (initialFetch) {
      fetchEntity();
    }
    console.log("FETCH")
  }, [initialFetch, fetchEntity]);

  return {
    entity: data,
    loading,
    error,
    fetchEntity,
    fetchOther,
    setEntity,
  };
};

export default useFetchAPI;
