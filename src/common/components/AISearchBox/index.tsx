import React from "react";
import clsx from "clsx";
import AdvancedAiSearch from "common/components/AISearchBox/AdvancedAiSearch";
import { useIsMobile } from "common/hooks/useIsMobile";
import { Role } from "enums/role";
type AISearchBoxContainerProps = {
  cover?: boolean;
  role?: Role;
  productDetailsModal: boolean;
};
const AISearchBoxContainer = ({
  productDetailsModal,
  cover,
}: AISearchBoxContainerProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div
        className={clsx(
          "fixed bg-white shadow-md rounded-md transition-all",
          !cover && "z-[1100]",
          "2xl:w-[57rem] xl:w-[42rem] lg:w-[37rem] sm:w-[40rem] w-11/12 mx-auto",
          {
            hidden: productDetailsModal,
            "bottom-4 left-0 right-0": isMobile,
            "xl:left-1/2 lg:left-[58%] sm:left-[45%] transform -translate-x-1/2 bottom-[20px]":
              !isMobile,
          },
        )}
      >
        <AdvancedAiSearch />
      </div>
    </>
  );
};
export default AISearchBoxContainer;
