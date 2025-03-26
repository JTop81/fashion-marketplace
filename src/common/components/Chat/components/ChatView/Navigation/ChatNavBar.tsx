import React from "react";
import { PropsWithChildren } from "types/propsWithChildren";

const ChatNavBar = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex gap-2 items-center justify-center">{children}</div>
  );
};

export default ChatNavBar;
