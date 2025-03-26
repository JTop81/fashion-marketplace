import React, { useState } from "react";
import {
  FaCopy,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

interface ShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  iconSize?: number;
}

const ShareComponent: React.FC<ShareProps> = ({
  url,
  title,
  description = "",
  className = "",
  iconSize = 24,
}) => {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#1877f2",
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
          "_blank",
        );
      },
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "#1da1f2",
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
        );
      },
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "#0a66c2",
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
      },
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25d366",
      onClick: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
          "_blank",
        );
      },
    },
    {
      name: "Email",
      icon: FaEnvelope,
      color: "#ea4335",
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`;
      },
    },
    {
      name: "Copy Link",
      icon: FaCopy,
      color: "#6b7280",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      },
    },
  ];

  return (
    <Menu
      as="div"
      className={clsx("relative inline-block text-left", className)}
    >
      <Menu.Button className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors">
        <TbShare3 size={iconSize} />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]">
        <div className="p-2">
          {shareOptions.map((option) => (
            <Menu.Item key={option.name}>
              {({ active }) => (
                <button
                  className={clsx(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
                    active
                      ? "bg-primary/5 text-primary"
                      : "text-gray-700 hover:bg-primary/5 hover:text-primary",
                  )}
                  onClick={option.onClick}
                >
                  <option.icon
                    size={20}
                    className={clsx(
                      "transition-colors duration-200",
                      active ? "text-primary" : "",
                    )}
                  />
                  <span>
                    {option.name === "Copy Link" && copied
                      ? "Copied!"
                      : option.name}
                  </span>
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default ShareComponent;
