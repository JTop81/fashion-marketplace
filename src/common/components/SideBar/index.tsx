import React, { useEffect, useState } from "react";
import { BiLogOut, BiSupport } from "react-icons/bi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { logo } from "assets";
import clsx from "clsx";
import { Role } from "enums/role";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useAuthStore } from "setup/store/auth/authStore";

import Image from "../Image";
import PrimaryButton from "../PrimaryButton";

import { LinkItem, roleBasedLinks } from "./constants";
import SingleLink from "./SingleLink";

const SideBar = ({
  role,
  onMinimize,
  isMobile = false,
}: {
  role: Role;
  onMinimize?: (minimized: boolean) => void;
  isMobile?: boolean;
}) => {
  const [isMinimized, setIsMinimized] = useState(
    isMobile ? false : window.innerWidth < 1280,
  );
  // const [isPopularTopicsOpen, setIsPopularTopicsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { enabledChats } = useFlags();
  const ldClient = useLDClient();
  const { user, logout, setAuthSection } = useAuthStore();
  // const navigate = useNavigate();
  const userRoleId = user?.user_role.id || "";
  const links = roleBasedLinks(role, userRoleId) as LinkItem[];

  useEffect(() => {
    if (ldClient && role !== Role.PUBLIC) {
      ldClient
        .identify({
          key: "user_role",
          name: "current_user",
          custom: { role },
        })
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [ldClient, role]);

  useEffect(() => {
    if (!isMobile) {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setIsMinimized(false);
          onMinimize?.(false);
        } else if (window.innerWidth < 1280) {
          setIsMinimized(true);
          onMinimize?.(true);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [onMinimize, isMobile]);

  const toggleMinimize = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    onMinimize?.(newState);
  };

  if (isLoading) {
    return <div className="relative lg:w-[270px] h-full" />;
  }

  const renderUserInfo = () =>
    !isMinimized && (
      <div
        className={clsx(
          "px-2 py-6",
          !isMobile && "border-b border-mediumGray mb-6",
          isMobile && "mb-4",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full w-10 h-10 bg-slate-400 flex-shrink-0">
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Welcome back</div>
            <div className="text-sm text-gray-500">{role}</div>
          </div>
        </div>
      </div>
    );

  const renderAuthenticatedContent = () => (
    <div className="flex flex-col h-full">
      {renderUserInfo()}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {links?.map((link) => {
          return link.title === "Chats" && !enabledChats ? null : (
            <SingleLink
              key={link.path}
              icon={link.icon}
              title={link.title}
              path={link.path}
              isMinimized={isMinimized}
              nestedItems={link.nestedItems}
              onMaximize={
                link.nestedItems?.length
                  ? () => {
                      setIsMinimized(false);
                      onMinimize?.(false);
                    }
                  : undefined
              }
            />
          );
        })}
      </div>

      <div className="mt-4 border-t border-mediumGray pt-4 flex-shrink-0">
        <SingleLink
          icon={<BiSupport className="w-6 h-6" />}
          title="Support"
          path="/support"
          isMinimized={isMinimized}
        />
        <SingleLink
          icon={<BiLogOut className="w-6 h-6" />}
          title="Sign Out"
          path="#"
          isMinimized={isMinimized}
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
          disableActiveState
        />
      </div>
    </div>
  );

  const renderPublicContent = () => (
    <div className="flex flex-col min-h-full py-4">
      <div className="flex flex-col gap-2 mb-4">
        {links.map((link) => (
          <SingleLink
            key={link.path}
            icon={link.icon}
            title={link.title}
            path={link.path}
            isMinimized={isMinimized}
            onClick={() => setAuthSection("login")}
          />
        ))}
      </div>

      <div className="mt-auto border-t border-mediumGray pt-4">
        <SingleLink
          icon={<BiSupport className="w-6 h-6" />}
          title="Support"
          path="/support"
          isMinimized={isMinimized}
        />
        {!isMinimized && (
          <div className="px-2 mt-4">
            <div className="flex flex-col gap-4">
              <PrimaryButton text="Log in" isFull />
              <PrimaryButton
                text="Sign up"
                isFull
                isOutlined
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setAuthSection("signup");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={clsx("relative z-[100]", !isMobile && "hidden lg:block")}>
      <nav
        className={clsx(
          "fixed left-0 top-0 bottom-0 bg-card transition-all duration-300 overflow-hidden",
          isMinimized && !isMobile ? "w-[100px]" : "w-[300px]",
          "px-6",
          "flex flex-col h-screen",
        )}
      >
        {!isMobile && (
          <div className="h-[87px] flex items-center justify-center flex-shrink-0 border-b border-mediumGray">
            <Link to="/">
              <Image
                src={logo}
                alt="logo"
                height={isMinimized ? "40" : "87"}
                width={isMinimized ? "40" : "86"}
              />
            </Link>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4 min-h-0">
          {role === Role.PUBLIC
            ? renderPublicContent()
            : renderAuthenticatedContent()}
        </div>
      </nav>

      {!isMobile && (
        <div
          className={clsx(
            "fixed top-0 h-screen transition-all duration-300",
            isMinimized ? "left-[100px]" : "left-[300px]",
          )}
        >
          <button
            onClick={toggleMinimize}
            className={clsx(
              "absolute top-20 -right-3 flex h-6 w-6 items-center justify-center",
              "bg-primary text-white rounded-full shadow-md",
              "hover:bg-primary/90 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            )}
          >
            {isMinimized ? (
              <BsChevronRight className="w-3 h-3" />
            ) : (
              <BsChevronLeft className="w-3 h-3" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
