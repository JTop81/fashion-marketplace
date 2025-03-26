import React, { useState } from "react";
import { BsCart } from "react-icons/bs";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { logo } from "assets";
import clsx from "clsx";
import { Role } from "enums/role";

import Image from "../Image";
import SideBar from "../SideBar";

export const TopBar = ({ role }: { role: Role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Fixed TopBar */}
      <nav
        className={clsx(
          "lg:hidden flex w-full items-center justify-between",
          "py-6 px-6 fixed top-0 left-0 right-0 bg-card z-[100]",
        )}
      >
        <button
          onClick={openModal}
          className="text-2xl hover:text-primary transition-colors p-2 -ml-2"
        >
          <CgMenuRightAlt />
        </button>

        <div className="flex items-center gap-6">
          {role === Role.SHOPPER && (
            <button className="text-2xl hover:text-primary transition-colors p-2">
              <BsCart className="w-6 h-6" />
            </button>
          )}
          <Link to="/">
            <Image src={logo} alt="logo" height="40" width="40" />
          </Link>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-[88px]" />

      {/* Slide-in Sidebar */}
      <div
        className={clsx(
          "lg:hidden fixed inset-0 bg-black/50 transition-opacity z-[9999]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={closeModal}
      >
        <div
          className={clsx(
            "fixed left-0 top-0 h-screen w-[300px] bg-card transition-transform duration-300",
            "transform",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Sidebar Header */}
          <div className="h-[88px] flex items-center justify-between px-6 bg-card border-b border-mediumGray">
            <Link to="/">
              <Image src={logo} alt="logo" height="40" width="40" />
            </Link>
            <button
              onClick={closeModal}
              className="text-2xl hover:text-primary transition-colors p-2 -mr-2"
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Sidebar Content */}
          <div className="h-[calc(100vh-88px)] overflow-y-auto">
            <SideBar role={role} onMinimize={() => {}} isMobile />
          </div>
        </div>
      </div>
    </>
  );
};
