import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "react-iconly";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { IoCartOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import GeneralPopover, {
  IPopoverClose,
} from "common/components/GeneralPopover";
import { Role } from "enums/role";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useAuthStore } from "setup/store/auth/authStore";

import { IconWithCounter } from "./IconWithCounter";
import SingleLink from "./SingleLink";

type Link = {
  path: string;
  icon: React.ReactNode;
  title: string;
};

type SideBarLinksProps = {
  links: Link[];
  popularTopicsContent: string;
  children?: React.ReactNode;
  role: Role;
};

export default function SideBarLinks({
  links,
  popularTopicsContent,
  role,
}: SideBarLinksProps) {
  const [isPopularTopicsOpen, setIsPopularTopicsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { enabledChats, enabledCart } = useFlags();
  const ldClient = useLDClient();

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (ldClient) {
      ldClient
        .identify({
          key: "user_role",
          name: "current_user",
          custom: {
            role,
          },
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [ldClient, role]);

  const popupMenuItems = useMemo(() => {
    return [
      {
        label: "Contact Us",
        icon: <MdOutlineContactSupport />,
        action: () => document.getElementById("hidden-mailto-link")?.click(),
      },
      {
        label: "Logout",
        icon: <IoLogOutOutline />,
        action: () =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          }),
      },
    ];
  }, [logout]);

  if (isLoading) {
    return <div className="relative lg: w-[270px] h-full" />;
  }

  return (
    <div className="relative lg:w-[270px] h-full">
      <div className="flex flex-col gap-2">
        {links?.map((link) => {
          return link.title === "Chats" && !enabledChats ? (
            <div key={link.path}></div>
          ) : (
            <SingleLink
              key={link.path}
              icon={link.icon}
              title={link.title}
              path={link.path}
            />
          );
        })}
      </div>

      {/* Poplar Topics ----------------------------------------- */}
      <section className="flex flex-col">
        <div className="flex flex-col items-start gap-6 py-2 mt-8 lg:pr-10">
          <div
            onClick={() => setIsPopularTopicsOpen(!isPopularTopicsOpen)}
            className="w-full flex justify-between py-2 border-b border-primary cursor-pointer"
          >
            <p className="font-semibold">Popular Topics</p>
            <div className={clsx(isPopularTopicsOpen && "rotate-90")}>
              <ChevronRight size={24} />
            </div>
          </div>
          {isPopularTopicsOpen && (
            <p className="text-sm font-medium opacity-50">
              {popularTopicsContent}
            </p>
          )}
        </div>

        {/* Bottom Menu ----------------------------------------- */}
        <div className="absolute bottom-0 w-full">
          {enabledCart && (
            <SingleLink
              icon={
                <IconWithCounter
                  icon={<IoCartOutline className="w-6 h-6" />}
                  count={10}
                />
              }
              title="My Cart"
              moreStyles="mb-4"
              path="Not-existing" // TODO: when the route will be created place it here
            />
          )}

          <div className="bg-mediumGray h-[1px] my-2 lg:mr-10" />

          <div className="flex items-center px-2 py-6 pr-10">
            <div className="rounded-full w-10 h-10 bg-slate-400 mr-4" />
            <div
              onClick={() => navigate(`/profile`)}
              className="flex-1 cursor-pointer"
            >
              <div className="text-sm">My Profile</div>
              <div className="opacity-50 text-sm">{role}</div>
            </div>

            <GeneralPopover
              location="top"
              moreStyles="bg-white rounded-md"
              customPopoverBotton={
                <HiOutlineDotsCircleHorizontal className="w-6 h-6 cursor-pointer" />
              }
              menuItems={({ close }: IPopoverClose) => (
                <div>
                  {popupMenuItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center p-2.5 cursor-pointer hover:bg-slate-100 rounded-lg"
                      onClick={() => {
                        item.action();
                        close && close();
                      }}
                    >
                      <div className="mr-3 text-xl">{item.icon}</div>
                      <span className="text-sm pr-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            />
            <a
              href="mailto:info@unik.style"
              id="hidden-mailto-link"
              className="hidden"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
