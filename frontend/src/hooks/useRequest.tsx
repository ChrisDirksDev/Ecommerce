import { useState, useCallback } from "react";

export const useRequest = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (requestFn: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await requestFn();
      setData(result);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};
