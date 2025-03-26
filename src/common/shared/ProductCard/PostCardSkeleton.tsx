import React from "react";
import ContentLoader from "react-content-loader";

const PostCardSkeleton = (props: any) => (
  <div className="w-full lg:w-[640px] xl:w-[620px] 2xl:w-[640px] p-4">
    <ContentLoader
      speed={2}
      className="w-full h-auto"
      viewBox="0 0 640 600"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      {/* Top part (User and Status) */}
      <circle cx="40" cy="40" r="30" /> {/* User avatar */}
      <rect x="80" y="25" rx="5" ry="5" width="100" height="20" />{" "}
      {/* Status */}
      {/* Dropdown menu */}
      <rect x="580" y="25" rx="5" ry="5" width="30" height="30" />
      {/* Time Info */}
      <rect x="80" y="60" rx="5" ry="5" width="100" height="20" />
      {/* Product Image */}
      <rect x="0" y="100" rx="10" ry="10" width="100%" height="450" />
      {/* Product Title */}
      <rect x="0" y="570" rx="5" ry="5" width="300" height="30" />
      {/* Product Price */}
      <rect x="0" y="610" rx="5" ry="5" width="80" height="20" />
      <rect x="100" y="610" rx="5" ry="5" width="80" height="20" />
      {/* Description */}
      <rect x="0" y="640" rx="5" ry="5" width="550" height="20" />
      <rect x="0" y="670" rx="5" ry="5" width="500" height="20" />
    </ContentLoader>
  </div>
);

export default PostCardSkeleton;
