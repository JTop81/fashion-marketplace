import React from "react";
import { IPost } from "api/services/posts/interfaces/post.interface";
import { Role } from "enums/role";
import DropDownType from "types/productDropDown";

import Image from "pages/buyer-home/post-details/components/Image";

import PublicProductCardBadges from "./PublicProductCardBadges";
import PublicProductDescription from "./PublicProductCardDescription";
import PublicProductCardMenu from "./PublicProductCardMenu";
import PublicUser from "./PublicProductCardPublisher";

interface Props {
  role: Role;
  time: number;
  dropDown: DropDownType[];
  post: IPost;
  productDetailsModal: boolean;
  findProduct: (proid: string) => void;
  setProductDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicPostCard: React.FC<Props> = ({
  dropDown,
  role,
  time,
  post,
  productDetailsModal,
}) => {
  // Validate that title exists since it's required
  if (!post.details?.title) {
    return null; // Don't render the card if there's no title
  }

  return (
    <div className="flex-1 relative bg-gray px-4 py-4 rounded-md max-w-[640px] w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 justify-between w-[530px]">
          {post.creator && (
            <PublicUser creator={post.creator} role={role} time={time} />
          )}
          <p className="bg-[#CFF3FB] text-secondary px-8 py-2 shadow-sm rounded cursor-pointer hidden lg:block whitespace-nowrap">
            {post.status || "Unknown"}
          </p>
        </div>
        {!productDetailsModal && <PublicProductCardMenu dropDown={dropDown} />}
      </div>
      <div className="block lg:flex items-end justify-between">
        <div className="xl:w-[550px] w-full mr-5">
          <Image
            src={
              post.assets && post.assets.length > 0
                ? post.assets[0].url
                : "/assets/images/no_image.png"
            }
            className="h-[450px] mt-5 w-full object-cover cursor-pointer"
          />
        </div>
        <div className="flex lg:contents items-center gap-2 justify-between">
          <PublicProductCardBadges role={role} statistics={post.statistics} />
          <p className="bg-[#CFF3FB] text-secondary px-2 sm:px-8 py-2 shadow-sm rounded cursor-pointer lg:hidden block whitespace-nowrap">
            {post.status || "Unknown"}
          </p>
        </div>
      </div>
      <div className="w-full xl:w-[550px]">
        <p className="text-2xl font-semibold mt-[22px]">{post.details.title}</p>
        <div className="flex gap-3 items-center mt-4">
          {post.details && "price" in post.details && (
            <p className="opacity-50 line-through">
              $ {Number(post.details.price) + 20}
            </p>
          )}
          {post.details && "price" in post.details && (
            <p>$ {post.details.price}</p>
          )}
        </div>
        <PublicProductDescription description={post.details?.description} />
        <div className="flex items-center gap-1 flex-wrap mt-1">
          <p className="opacity-70 text-sm cursor-pointer">
            View {post?.statistics?.total?.comments} comments
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicPostCard;
