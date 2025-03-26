import React from "react";
import { PropsWithChildren } from "types/propsWithChildren";

const ChatHeaderLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex px-4 border-b-2 border-stone-100 h-14 min-h-14 max-h-14 w-full justify-between items-center">
      {children}
    </div>
  );
};

export default ChatHeaderLayout;
