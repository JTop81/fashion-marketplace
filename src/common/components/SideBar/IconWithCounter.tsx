interface IconWithCounterProps {
  icon: React.ReactNode;
  count: number;
}

export const IconWithCounter = ({ icon, count }: IconWithCounterProps) => (
  <div className="relative flex-shrink-0">
    <div className="absolute top-[-9px] left-3 px-[6px] py-1 rounded-lg bg-primarySecondary text-xs">
      {count}
    </div>
    {icon}
  </div>
);
