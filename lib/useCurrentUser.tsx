import useSwr from "swr";

import fetcher from "./fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/user", fetcher, { refreshInterval: 10000 });
  if (!data) {
    return { isLoading, data: null, error };
  }
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
