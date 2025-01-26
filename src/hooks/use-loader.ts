import { useCallback, useEffect, useState } from "react";

type State<T> =
  | { status: "pending"; reload: () => void }
  | { status: "success"; data: T; reload: () => void }
  | { status: "error"; error: Error; reload: () => void };

export const useLoader = <T>(getter: () => Promise<T>): State<T> => {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const load = useCallback((): (() => void) => {
    setIsPending(true);
    setData(undefined);
    setError(undefined);
    const controller = new AbortController();
    getter()
      .then((newData) => {
        if (!controller.signal.aborted) {
          setData(newData);
          setError(undefined);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setData(undefined);
          setError(err as Error);
        }
      })
      .finally(() => setIsPending(false));
    return () => controller.abort();
  }, [getter]);

  useEffect(() => {
    return load();
  }, [load]);

  const reload = useCallback(() => {
    load();
  }, [load]);

  if (isPending) {
    return { status: "pending", reload };
  } else if (data) {
    return { status: "success", data, reload };
  }

  return { status: "error", error: error!, reload };
};
