import { FC } from "react";

const Loading: FC<{ height?: string }> = ({ height }) => {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: height ? height : "100vh" }}
    >
      <div className="w-12 h-12 border-4 border-primary border-t-transparent border-b-transparent rounded-full animate-spin" />
      <div className="mt-4">Loading...</div>
    </div>
  );
};

export default Loading;
