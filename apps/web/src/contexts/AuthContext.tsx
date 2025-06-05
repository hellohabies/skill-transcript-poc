import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  GetMeResponseSchema,
  SignInRequestSchema,
} from "../../../api/src/schemas/auth.schema";
import { useAuthMutation } from "@/hooks/mutation/auth/useAuthMutation";
import { useAuthQuery } from "@/hooks/query/auth/useAuthQuery";
import type { Role } from "../../../api/src/config/prisma";
import { getErrorResponse, handleError } from "@/lib/error";
import { toast } from "sonner";

interface IAuthContext {
  authUserRole: Role | null;
  authUser: GetMeResponseSchema | null;
  setAuthUser: (user: GetMeResponseSchema | null) => void;
  isAuthenticating: boolean;
  isAuthenticationError: boolean;
  signIn: (credentials: SignInRequestSchema) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const initialState: IAuthContext = {
  authUserRole: null,
  authUser: null,
  setAuthUser: () => {},
  isAuthenticating: false,
  isAuthenticationError: false,
  signIn: async () => false,
  signOut: async () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<GetMeResponseSchema | null>(null);
  const [authUserRole, setAuthUserRole] = useState<Role | null>(null);

  const {
    signInMutation,
    isSignInPending,
    isSignInError,
    signoutMutation,
    isSignoutPending,
    isSignoutError,
    refreshMutation,
    isRefreshError,
  } = useAuthMutation();

  const { isLoadingAuthUser, refetchAuthUser, isFetchingAuthUser } = useAuthQuery();

  const isAuthenticating = useMemo(() => {
    return isSignInPending || isSignoutPending || isLoadingAuthUser || isFetchingAuthUser;
  }, [isSignInPending, isSignoutPending, isLoadingAuthUser, isFetchingAuthUser]);

  const isAuthenticationError = useMemo(() => {
    return isSignInError || isSignoutError || isRefreshError;
  }, [isSignInError, isSignoutError, isRefreshError]);

  const refreshUserToken = useCallback(async () => {
    await refreshMutation();
  }, [refreshMutation]);

  const fetchAuthUser = useCallback(async () => {
    try {
      const { data } = await refetchAuthUser();
      const user = data?.data?.data;

      if (user) {
        setAuthUser(user);
        setAuthUserRole(user.role as Role);
      }
    } catch (error) {
      handleError(error);
    }
  }, [refetchAuthUser]);

  const signIn = useCallback(
    async (credentials: SignInRequestSchema) => {
      try {
        const { error } = await signInMutation(credentials);

        if (error?.value) {
          console.log(error.value);
          toast.error("ไม่สามารถเข้าสู่ระบบ โปรดตรวจสอบอีเมลและรหัสผ่าน");
          return false;
        }
        await fetchAuthUser();
        return true;
      } catch (error) {
        handleError(error);
      }
      return false;
    },
    [signInMutation, fetchAuthUser]
  );

  const signOut = useCallback(async () => {
    try {
      const { error } = await signoutMutation();

      if (error?.value) {
        console.log(getErrorResponse(error));
        return;
      }

      setAuthUser(null);
      setAuthUserRole(null);
    } catch (error) {
      handleError(error);
    }
  }, [signoutMutation]);

  useEffect(() => {
    async function _refreshUserToken() {
      try {
        await refreshUserToken();
      } catch (error) {
        handleError(error);
      }
    }

    const interval = setInterval(_refreshUserToken, 60 * 1000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, [refreshUserToken]);

  useEffect(() => {
    async function _fetchAuthUser() {
      await fetchAuthUser();
    }

    _fetchAuthUser();
  }, [fetchAuthUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        authUserRole,
        isAuthenticating,
        isAuthenticationError,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
