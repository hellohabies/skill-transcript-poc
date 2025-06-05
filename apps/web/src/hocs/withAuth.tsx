import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import type { Role } from "../../../api/src/config/prisma";
import { Loader } from "lucide-react";

interface ProtectedRouteConfig {
  allowedRoles?: Role[];
  unauthorizedRedirectPath?: string;
}

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  config: ProtectedRouteConfig
): React.FC<P> => {
  return function WithAuth(props: P) {
    const navigate = useNavigate();
    const { authUser, isAuthenticating, authUserRole } = useContext(AuthContext);
    const { allowedRoles, unauthorizedRedirectPath: _unauthorizedRedirectPath } = config;

    const unauthorizedRedirectPath = _unauthorizedRedirectPath || "/";

    useEffect(() => {
      if (isAuthenticating) return;

      if (!authUser) {
        navigate(unauthorizedRedirectPath, { replace: true });
        return;
      }

      const isAuthorized =
        authUser && authUserRole && (allowedRoles ? allowedRoles.includes(authUserRole) : true);

      if (!authUser || !isAuthorized) {
        navigate(unauthorizedRedirectPath, { replace: true });
      }
    }, [
      authUser,
      allowedRoles,
      navigate,
      unauthorizedRedirectPath,
      isAuthenticating,
      authUserRole,
    ]);

    if (isAuthenticating) {
      return (
        <div className="h-dvh flex flex-col items-center justify-center">
          <Loader />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
