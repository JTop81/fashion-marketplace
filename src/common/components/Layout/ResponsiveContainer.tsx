import clsx from "clsx";

export const ResponsiveContainer = ({
  children,
  isInCenter = true,
  additionalClass,
}: {
  children: React.ReactNode;
  isInCenter?: boolean;
  additionalClass?: string;
}) => {
  return (
    <div
      className={clsx(
        "sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] w-full lg:w-fit xl:max-w-[980px] 2xl:max-w-max",
        isInCenter && "mx-auto",
        additionalClass || "",
      )}
    >
      {children}
    </div>
  );
};
