import { ReactNode, useState } from "react";
import { clsx } from "clsx";
import SideBar from "common/components/SideBar";
import { TopBar } from "common/components/TopBar";
import { Role } from "enums/role";

import { ResponsiveContainer } from "./ResponsiveContainer";
interface LayoutProps {
  role: Role;
  children: ReactNode;
  isFull?: boolean;
  wrapperClasses?: string;
}

const Layout = ({ role, children, wrapperClasses, isFull }: LayoutProps) => {
  const [isMinimized, setIsMinimized] = useState(window.innerWidth < 1280);

  return (
    <main className="flex flex-col items-center lg:flex-row lg:items-start">
      <SideBar role={role} onMinimize={setIsMinimized} />

      <div className="w-full flex flex-col min-h-screen">
        <TopBar role={role} />

        <section className="flex w-full flex-grow">
          <div
            className={clsx(
              "hidden lg:block h-screen transition-all duration-300",
              isMinimized ? "min-w-[80px]" : "min-w-[300px]",
            )}
          />

          {!isFull ? (
            <ResponsiveContainer additionalClass={wrapperClasses}>
              {children}
            </ResponsiveContainer>
          ) : (
            <div className="w-full mx-auto overflow-x-hidden">{children}</div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Layout;
