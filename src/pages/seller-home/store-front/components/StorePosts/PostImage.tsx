import { useState } from "react";

type ImageProps = {
  fallback?: React.ReactNode;
  post: any;
  hoverId: string;
} & any;
const PostImage = ({ fallback, post, hoverId }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="relative w-full h-full">
      {isLoading &&
        (fallback ? (
          fallback
        ) : (
          <div className="absolute flex w-full h-full items-center bg-gray-100 bg-opacity-50 justify-center backdrop-filter backdrop-blur">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary" />
          </div>
        ))}
      <img
        className="object-cover w-full h-full"
        style={{
          filter: hoverId === true ? "brightness(0.7)" : "brightness(1)",
        }}
        src={
          post.assets && post.assets.length > 0
            ? post.assets[0].url
            : "/assets/images/no_image.png"
        }
        onLoad={handleLoad}
      />
    </div>
  );
};
export default PostImage;
