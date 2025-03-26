import { GoPencil } from "react-icons/go";
import { IoFlagOutline } from "react-icons/io5";
import { MdOutlineHideSource } from "react-icons/md";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

type SocialMediaBtnsProps = {
  isOwner?: boolean;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WrapBtns(props: SocialMediaBtnsProps) {
  const { setEditModalOpen, isOwner } = props;

  return (
    <>
      {isOwner ? (
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => setEditModalOpen((prev) => !prev)}
              className={clsx(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
                active
                  ? "bg-primary/5 text-primary"
                  : "text-gray-700 hover:bg-primary/5 hover:text-primary",
              )}
            >
              <GoPencil
                size={20}
                className={clsx(
                  "transition-colors duration-200",
                  active ? "text-primary" : "",
                )}
              />
              <span>Edit</span>
            </button>
          )}
        </Menu.Item>
      ) : (
        <>
          <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
                  active
                    ? "bg-primary/5 text-primary"
                    : "text-gray-700 hover:bg-primary/5 hover:text-primary",
                )}
              >
                <MdOutlineHideSource
                  size={20}
                  className={clsx(
                    "transition-colors duration-200",
                    active ? "text-primary" : "",
                  )}
                />
                <span>Block</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
                  active
                    ? "bg-primary/5 text-primary"
                    : "text-gray-700 hover:bg-primary/5 hover:text-primary",
                )}
              >
                <IoFlagOutline
                  size={20}
                  className={clsx(
                    "transition-colors duration-200",
                    active ? "text-primary" : "",
                  )}
                />
                <span>Report</span>
              </button>
            )}
          </Menu.Item>
        </>
      )}
    </>
  );
}
