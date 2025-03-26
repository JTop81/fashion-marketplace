import React from "react";
import clsx from "clsx";

type ProgressBarProps = {
  relatedTab: number;
  currentTab: number;
};

const ProgressBar = ({ relatedTab, currentTab }: ProgressBarProps) => {
  const setWidthStyles = () => {
    if (relatedTab === currentTab) {
      return "w-1/2";
    } else if (currentTab > relatedTab) {
      return "w-full";
    } else {
      return "w-0";
    }
  };
  return (
    <div className="w-full flex justify-end">
      <div className="w-[64px] h-[4px] bg-stone-300  rounded-full p-0 m-0 self-center ">
        <div
          className={clsx(
            setWidthStyles(),
            " h-[4px] bg-blue-500 rounded-full m-0 p-0 self-center",
          )}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
