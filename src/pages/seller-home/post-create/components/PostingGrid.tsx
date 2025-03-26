import clsx from "clsx";

type PostingGridProps = React.HTMLAttributes<HTMLDivElement>;

export const PostingGrid = ({ children, className }: PostingGridProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-8 gap-x-10 md:gap-x-4 md:gap-y-20 gap-y-5 md:my-10 my-2 mx-3 md:mx-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PostingGridSmall = ({ children, className }: PostingGridProps) => {
  return (
    <div
      className={clsx(
        "col-span-8 md:col-span-2 flex flex-col gap-y-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PostingGridLarge = ({ children, className }: PostingGridProps) => {
  return (
    <div
      className={clsx(
        "flex items-center col-span-8 md:col-span-6 mb-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

type PostingGridTextProps = React.HTMLAttributes<HTMLDivElement>;

export const PostingGridTitle = ({
  children,
  className,
}: PostingGridTextProps) => {
  return (
    <h3 className={clsx("text-black font-medium text-xl", className)}>
      {children}
    </h3>
  );
};

export const PostingGridDescription = ({
  children,
  className,
}: PostingGridTextProps) => {
  return <p className={clsx("text-zinc-600 text-sm", className)}>{children}</p>;
};
