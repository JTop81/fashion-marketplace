import { HTMLAttributes } from "react";
import clsx from "clsx";

type TagProps = HTMLAttributes<HTMLDivElement> & {
  tag: string;
};

export const Tag = ({ tag, className, children, ...rest }: TagProps) => {
  return (
    <div
      className={clsx(
        "flex items-center space-x-2 rounded-full border  px-5 py-2 border-stone-300 border-2",
        className,
      )}
      {...rest}
    >
      <span>{tag}</span>
      {children}
    </div>
  );
};
