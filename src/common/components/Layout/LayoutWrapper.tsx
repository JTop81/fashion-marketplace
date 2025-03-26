import { ReactNode } from "react";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";

import Layout from "./index";

interface LayoutWrapperProps {
  children: ReactNode;
  isFull?: boolean;
  wrapperClasses?: string;
}

export const LayoutWrapper = ({
  children,
  isFull,
  wrapperClasses,
}: LayoutWrapperProps) => {
  const { user } = useAuthStore();
  const role = (user?.assigned_role.role_name as Role) || Role.PUBLIC;

  return (
    <Layout role={role} isFull={isFull} wrapperClasses={wrapperClasses}>
      {children}
    </Layout>
  );
};

export default LayoutWrapper;
