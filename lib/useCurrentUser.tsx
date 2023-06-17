import useSwr from "swr";

import fetcher from "./fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/user", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
