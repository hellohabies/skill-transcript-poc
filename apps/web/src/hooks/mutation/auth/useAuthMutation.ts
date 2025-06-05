import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { SignInRequestSchema } from "../../../../../api/src/schemas/auth.schema";

export function useAuthMutation() {
  const {
    mutateAsync: signInMutation,
    isPending: isSignInPending,
    isError: isSignInError,
  } = useMutation({
    mutationFn: (data: SignInRequestSchema) => api.auth.signin.post(data),
  });

  const {
    mutateAsync: signoutMutation,
    isPending: isSignoutPending,
    isError: isSignoutError,
  } = useMutation({
    mutationFn: () => api.auth.signout.post(),
  });

  const {
    mutateAsync: refreshMutation,
    isPending: isRefreshPending,
    isError: isRefreshError,
  } = useMutation({
    mutationFn: () => api.auth.refresh.post(),
  });

  return {
    signInMutation,
    isSignInPending,
    isSignInError,

    signoutMutation,
    isSignoutPending,
    isSignoutError,

    refreshMutation,
    isRefreshPending,
    isRefreshError,
  };
}
