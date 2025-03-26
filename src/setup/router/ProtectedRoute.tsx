import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutWrapper from "common/components/Layout/LayoutWrapper";
import Loading from "common/components/Loader";
import { Role } from "enums/role";

import { useAuthStore } from "../store/auth/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: Role[];
  noLayout?: boolean; // Add this prop to optionally disable layout wrapping
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
  noLayout = false,
}) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    setAuthSection,
    shouldHandleAuthentication,
  } = useAuthStore();
  const navigate = useNavigate();

  const isPublic = roles.includes(Role.PUBLIC);
  const hasRole = user && roles.includes(user.assigned_role.role_name as Role);

  useEffect(() => {
    if (!isAuthenticated && !isPublic && !shouldHandleAuthentication) {
      // Trigger login only if the route is not public
      setAuthSection("login");
    }
  }, [isAuthenticated, isPublic, setAuthSection, shouldHandleAuthentication]);

  useEffect(() => {
    if (!isLoading && !shouldHandleAuthentication) {
      if (!isAuthenticated && !isPublic) {
        navigate("/", { replace: true });
      } else if (!hasRole && !isPublic) {
        navigate("/404", { replace: true });
      }
    }
  }, [
    isAuthenticated,
    isPublic,
    hasRole,
    isLoading,
    shouldHandleAuthentication,
    navigate,
  ]);

  if (isLoading || shouldHandleAuthentication) {
    return <Loading />;
  }

  // Allow access if the route is public or the user is authenticated with the required role
  if ((isAuthenticated && hasRole) || isPublic) {
    return noLayout ? (
      <>{children}</>
    ) : (
      <LayoutWrapper>{children}</LayoutWrapper>
    );
  }

  return null;
};

export default ProtectedRoute;
