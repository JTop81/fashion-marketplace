import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import PostModal from "pages/seller-home/posts/components/PostModal/PostModal";

type SingleLinkProps = {
  icon: React.ReactNode;
  title: string;
  moreStyles?: string;
  path: string;
  isMinimized?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMaximize?: () => void;
  disableActiveState?: boolean;
  nestedItems?: Array<{
    title: string;
    path: string;
    icon?: React.ReactNode;
    isModal?: boolean;
  }>;
};

export default function SingleLink({
  icon,
  title,
  moreStyles,
  path,
  isMinimized = false,
  onClick,
  onMaximize,
  disableActiveState = false,
  nestedItems,
}: SingleLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when minimized
  useEffect(() => {
    if (isMinimized) {
      setIsOpen(false);
    }
  }, [isMinimized]);

  // Check if current path matches this item or its children
  useEffect(() => {
    if (nestedItems?.length) {
      const currentFullPath = location.pathname + location.hash;
      const hasActiveChild = nestedItems.some((item) =>
        currentFullPath.startsWith(item.path),
      );
      if (hasActiveChild && !isOpen) {
        setIsOpen(true);
      }
    }
  }, [location.pathname, location.hash, nestedItems, isOpen]);

  // Determine if this item should be highlighted based on URL path
  const isActive = (() => {
    if (disableActiveState) return false;

    const currentFullPath = location.pathname + location.hash;

    // For items with nested items
    if (nestedItems?.length) {
      return nestedItems.some((item) => currentFullPath.startsWith(item.path));
    }

    // For regular items, match exact path
    return currentFullPath === path || location.pathname === path;
  })();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Always prevent default behavior

    if (nestedItems?.length) {
      if (isMinimized) {
        onMaximize?.();
      }
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick(e);
    } else {
      // Use replace instead of push for same route navigation
      const isSameRoute = location.pathname === path;
      if (isSameRoute) {
        navigate(path, { replace: true });
      } else {
        navigate(path);
      }
    }
  };

  const handleNestedItemClick = (
    e: React.MouseEvent,
    item: NonNullable<typeof nestedItems>[number],
  ) => {
    e.preventDefault();
    if (item.isModal) {
      setIsModalOpen(true);
    } else {
      // Use replace instead of push for same route navigation
      const isSameRoute = location.pathname === item.path;
      if (isSameRoute) {
        navigate(item.path, { replace: true });
      } else {
        navigate(item.path);
      }
    }
  };

  const isNestedItemActive = (itemPath: string) => {
    const currentFullPath = location.pathname + location.hash;
    return currentFullPath.startsWith(itemPath);
  };

  return (
    <div>
      <div onClick={handleClick} className="block -mx-4 cursor-pointer">
        <li
          className={clsx(
            "flex items-center text-left leading-5 cursor-pointer",
            "hover:bg-primary/5 hover:font-semibold transition-colors",
            moreStyles || "",
            isActive && "font-semibold bg-primary/5",
            window.innerHeight < 950 ? "py-2" : "py-4",
          )}
        >
          <div className="pl-8 flex items-center min-w-[48px]">
            <div className="text-xl">{icon}</div>
          </div>
          {!isMinimized && (
            <div className="flex items-center justify-between flex-1">
              <span className="text-sm font-medium pl-2">{title}</span>
              {nestedItems?.length && (
                <div className="text-sm mr-10">
                  {isOpen ? <BsChevronDown /> : <BsChevronRight />}
                </div>
              )}
            </div>
          )}
        </li>
      </div>

      {nestedItems?.length && !isMinimized && (
        <ul className={clsx("pl-12", !isOpen && "hidden")}>
          {nestedItems.map((item) => (
            <div
              key={item.path}
              onClick={(e) => handleNestedItemClick(e, item)}
              className="cursor-pointer"
            >
              <li
                className={clsx(
                  "flex items-center text-left leading-5 cursor-pointer -mx-4",
                  "hover:bg-primary/5 hover:font-semibold transition-colors",
                  isNestedItemActive(item.path) &&
                    !item.isModal &&
                    "font-semibold bg-primary/5",
                  window.innerHeight < 950 ? "py-2" : "py-3",
                )}
              >
                {item.icon && (
                  <div className="pl-8 flex items-center min-w-[48px]">
                    <div className="text-xl">{item.icon}</div>
                  </div>
                )}
                <span className="text-sm font-medium pl-2">{item.title}</span>
              </li>
            </div>
          ))}
        </ul>
      )}
      {isModalOpen && <PostModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
