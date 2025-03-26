import { PropsWithChildren } from "types/propsWithChildren";

const DateDivider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex items-center">
      <div className="border-b border-stone-300 w-full"></div>
      <span className="px-4 py-1 font-semibold text-stone-400 whitespace-nowrap">
        {children}
      </span>
      <div className="border-b border-stone-300 w-full"></div>
    </div>
  );
};

export default DateDivider;
