import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useAuthQuery() {
  const {
    data: authUser,
    isLoading: isLoadingAuthUser,
    refetch: refetchAuthUser,
    isFetching: isFetchingAuthUser,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => api.auth.me.get(),
  });

  return {
    authUser,
    isLoadingAuthUser,
    isFetchingAuthUser,
    refetchAuthUser,
  };
}
