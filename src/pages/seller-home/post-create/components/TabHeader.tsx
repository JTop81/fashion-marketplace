import React from "react";
import clsx from "clsx";

type TabHeaderProps = {
  children: React.ReactNode;
  isSelected?: boolean;
  isFinished?: boolean;
};

const TabHeader: React.FC<TabHeaderProps> = ({
  children,
  isSelected = false,
  isFinished = false,
}) => {
  return (
    <div className="flex gap-x-5">
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          isSelected,
          isFinished,
        }),
      )}
    </div>
  );
};

type TabIconProps = {
  children: React.ReactNode;
  isSelected?: boolean;
  isFinished?: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({
  children,
  isSelected,
  isFinished,
}) => {
  const isSelectedStyles = isSelected
    ? "md:bg-blue-100 bg-blue-500"
    : isFinished
      ? "bg-blue-500 "
      : "md:bg-neutral-100 bg-neutral-100";

  return (
    <div
      className={clsx("flex max-h-20 max-w-20 rounded p-3", isSelectedStyles)}
    >
      {children}
    </div>
  );
};

type TabContentProps = {
  children: React.ReactNode;
};

const TabTitle: React.FC<TabContentProps> = ({ children }) => {
  return <p className="font-medium">{children}</p>;
};

const TabDescription: React.FC<TabContentProps> = ({ children }) => {
  return <p className="text-zinc-500 tracking-wider">{children}</p>;
};

export { TabHeader, TabIcon, TabTitle, TabDescription };
