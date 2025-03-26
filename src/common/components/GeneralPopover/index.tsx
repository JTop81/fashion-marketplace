import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";

export interface IPopoverClose {
  close?: (ref?: any | HTMLElement) => void;
}

type GeneralPopoverProps = {
  location: "top" | "bottom" | "left" | "right" | "bottom end" | "bottom start";
  customPopoverBotton: React.ReactNode;
  menuItems: React.ReactNode | (({ close }: IPopoverClose) => React.ReactNode);
  customMenuStyles?: string;
  moreStyles?: string;
  popoverPanelClasses?: string;
};

export default function GeneralPopover({
  location,
  customPopoverBotton,
  menuItems,
  customMenuStyles,
  moreStyles,
  popoverPanelClasses,
}: GeneralPopoverProps) {
  return (
    <Popover className="relative">
      {({ close }: IPopoverClose) => (
        <>
          <PopoverButton>{customPopoverBotton}</PopoverButton>
          <PopoverPanel
            portal
            anchor={location}
            className={popoverPanelClasses || "z-[10000000]"}
          >
            <div className={customMenuStyles || clsx("p-2", moreStyles || "")}>
              {typeof menuItems === "function"
                ? menuItems({ close })
                : menuItems}
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
