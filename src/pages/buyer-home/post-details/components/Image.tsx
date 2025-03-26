import React, { ComponentProps, useState } from "react";

type ImageProps = {
  fallback?: React.ReactNode;
} & ComponentProps<"img">;

const Image = ({ fallback, className, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="relative w-full">
      {isLoading &&
        (fallback ? (
          fallback
        ) : (
          <div className="absolute flex w-full h-full items-center bg-gray-100 bg-opacity-50 justify-center backdrop-filter backdrop-blur">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary" />
          </div>
        ))}
      <img
        className={`w-full aspect-square ${className}`}
        {...props}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default Image;
