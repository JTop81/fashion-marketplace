import React, { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { IPost } from "api/services/posts/interfaces/post.interface";
import { IPostAssetResponse } from "api/services/posts/interfaces/post-response.interface";
import { PRODUCT_DETAILS_Z_INDEX } from "common/util/z-indexes";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";
import DropDownProps from "types/productDropDown";

import { BuyerPostInfoPanel } from "pages/buyer-home/post-details/components/BuyerPostInfoPanel";
import Image from "pages/buyer-home/post-details/components/Image";

import SellerPostInfoPanel from "./SellerPostInfoPanel";

import "./style.css";

interface PostDetailsProps {
  isOwner?: boolean;
  dropDown: DropDownProps[];
  post: IPost;
  role: Role;
  onModalClose: () => void;
  initial: boolean;
  setInitial: (v: boolean) => void;
}

const ProductDetails: React.FC<PostDetailsProps> = ({
  isOwner,
  dropDown,
  post,
  role,
  onModalClose,
  initial,
  setInitial,
}) => {
  const { user } = useAuthStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldScrollToComments = localStorage.getItem("scrollToComments");
    if (shouldScrollToComments === "true" && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
      localStorage.removeItem("scrollToComments");
    }
  }, []);

  // Check if the current user is the creator of the post
  const isCreator = user?.user_role.id === post.creator_id;

  return (
    <div
      style={{ zIndex: PRODUCT_DETAILS_Z_INDEX }}
      className="fixed left-0 right-0 bottom-0 w-screen h-screen lg:inset-0 bg-paleSilver"
    >
      <p
        className="bg-black fixed inset-0 -z-10 opacity-70 block lg:hidden"
        onClick={onModalClose}
      ></p>
      <RxCross1
        size={32}
        className="cursor-pointer fixed top-1 left-1 sm:top-4 sm:left-4 bg-mediumGray rounded-full p-2 text-white z-10"
        onClick={onModalClose}
      />
      <div className="absolute left-0 bottom-0 w-full h-[90%] lg:h-full flex">
        <div className="w-1/2 max-h-screen overflow-y-auto rounded-tl-[40px] lg:rounded-none hidden md:block bg-white">
          {post.assets && post.assets.length > 0 ? (
            post.assets.map((item: IPostAssetResponse) => (
              <Image
                key={item.id}
                src={item.url}
                className="h-full object-cover"
              />
            ))
          ) : (
            <Image
              src="/assets/images/no_image.png"
              className="h-full object-cover"
            />
          )}
        </div>

        <div
          ref={contentRef}
          className="bg-white w-full lg:w-1/2 rounded-t-xl md:rounded-tl-none md:rounded-tr-[40px] lg:rounded-none overflow-y-auto lg:h-screen"
        >
          {isOwner ? (
            <SellerPostInfoPanel
              statistics={post.statistics}
              post={post}
              dropDown={dropDown}
              initial={initial}
              setInitial={setInitial}
              commentsRef={commentsRef}
              isCreator={isCreator}
            />
          ) : (
            <BuyerPostInfoPanel
              post={post}
              dropDown={dropDown}
              statistics={post.statistics}
              initial={initial}
              setInitial={setInitial}
              commentsRef={commentsRef}
              isCreator={isCreator}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
