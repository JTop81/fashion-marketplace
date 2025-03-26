import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import { createPost } from "api/services/posts";
import {
  ICustomCreateData,
  IDiscussiongCreateDate,
  IExternalCreateData,
  IPost,
  IProductCreateData,
} from "api/services/posts/interfaces/post.interface";
import {
  ICustomRequestDetails,
  IDiscussionDetails,
  IExternalDetails,
  IProductDetails,
  PostStatus,
  PostType,
} from "api/services/posts/interfaces/post-response.interface";
import clsx from "clsx";
import AvailableOnPlatform from "common/components/AvailableOnPlatform";
import { Role } from "enums/role";
import DropDownType from "types/productDropDown";

import Image from "pages/buyer-home/post-details/components/Image";

import ProductCardBadges from "./ProductCardBadges";
import ProductDescription from "./ProductCardDescription";
import ProductCardMenu from "./ProductCardMenu";
import User from "./ProductCardPublisher";

interface Props {
  role: Role;
  isCreator: boolean;
  post: IPost;
  dropDown: DropDownType[];
  productDetailsModal: boolean;
  findProduct: (proid: string) => void;
  setProductDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  containerStyle?: string;
  titleStyle?: string;
  imgStyle?: string;
  actionStyle?: string;
  scrollToComments?: boolean;
}

const ProductCard: React.FC<Props> = ({
  dropDown,
  role,
  isCreator,
  post,
  productDetailsModal,
  setProductDetailsModal,
  findProduct,
  containerStyle,
  titleStyle,
  imgStyle,
  actionStyle,
  scrollToComments,
}) => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<PostStatus>(post.status);

  const prevImg = () => {
    if (imgIndex === 0) return;
    setImgIndex((prev) => prev - 1);
  };

  const nextImg = () => {
    if (imgIndex === post.assets.length - 1 || post.assets.length === 0) return;
    setImgIndex((prev) => prev + 1);
  };

  const handleViewComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProductDetailsModal(true);
    findProduct(post.id || "");
    // Set a flag to indicate we should scroll to comments when modal opens
    localStorage.setItem("scrollToComments", "true");
  };

  const handleStatusChange = async (newStatus: PostStatus) => {
    if (isUpdating || newStatus === currentStatus || !post.details) return;

    try {
      setIsUpdating(true);

      // Create a new post with the updated status based on the post type
      if (post.type === PostType.PRODUCT) {
        const details = post.details as IProductDetails;
        const data: IProductCreateData = {
          id: post.id,
          type: PostType.PRODUCT,
          title: details.title,
          description: details.description,
          price: details.price,
          discount: details.discount || "",
        };
        await createPost(PostType.PRODUCT, newStatus, data);
        setCurrentStatus(newStatus);
      } else if (post.type === PostType.EXTERNAL) {
        const details = post.details as IExternalDetails;
        const data: IExternalCreateData = {
          id: post.id,
          type: PostType.EXTERNAL,
          title: details.title,
          url: details.url,
          platform: details.platform,
          description: details.description,
          price: details.price,
          discount: details.discount,
          availability: details.availability,
        };
        await createPost(PostType.EXTERNAL, newStatus, data);
        setCurrentStatus(newStatus);
      } else if (post.type === PostType.DISCUSSION) {
        const details = post.details as IDiscussionDetails;
        const data: IDiscussiongCreateDate = {
          type: PostType.DISCUSSION,
          title: details.title,
          description: details.description,
        };
        await createPost(PostType.DISCUSSION, newStatus, data);
        setCurrentStatus(newStatus);
      } else if (post.type === PostType.CUSTOM_REQUEST) {
        const details = post.details as ICustomRequestDetails;
        const data: ICustomCreateData = {
          type: PostType.CUSTOM_REQUEST,
          title: details.title,
          description: details.description,
          budget: details.price,
        };
        await createPost(PostType.CUSTOM_REQUEST, newStatus, data);
        setCurrentStatus(newStatus);
      }

      toast.success(`Post status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update post status:", error);
      toast.error("Failed to update post status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: PostStatus) => {
    switch (status) {
      case PostStatus.LIVE:
        return "bg-primary/5 text-primary";
      case PostStatus.DRAFTED:
        return "bg-yellow-500/5 text-yellow-600";
      case PostStatus.UNAVAILABLE:
        return "bg-red-500/5 text-red-600";
      case PostStatus.ARCHIVED:
        return "bg-gray-500/5 text-gray-600";
      default:
        return "bg-gray-500/5 text-gray-600";
    }
  };

  const StatusBadge = () => {
    if (!isCreator) {
      return (
        <p
          className={clsx(
            "px-8 py-2 shadow-sm rounded-md whitespace-nowrap",
            getStatusColor(currentStatus),
          )}
        >
          {currentStatus || "Unknown"}
        </p>
      );
    }

    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          disabled={isUpdating}
          className={clsx(
            "px-8 py-2 shadow-sm rounded-md whitespace-nowrap transition-all duration-200",
            getStatusColor(currentStatus),
            isUpdating ? "opacity-50 cursor-not-allowed" : "hover:opacity-90",
          )}
        >
          {isUpdating ? "Updating..." : currentStatus || "Unknown"}
        </Menu.Button>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="p-1">
              {Object.values(PostStatus).map((status) => (
                <Menu.Item key={status}>
                  {({ active }) => (
                    <button
                      onClick={() => handleStatusChange(status)}
                      disabled={isUpdating || status === currentStatus}
                      className={clsx(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
                        active
                          ? "bg-primary/5 text-primary"
                          : "text-gray-700 hover:bg-primary/5 hover:text-primary",
                        status === currentStatus && "bg-gray-50 font-medium",
                        isUpdating && "cursor-not-allowed opacity-50",
                      )}
                    >
                      <span>{status}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  return (
    <div
      className={clsx(
        "flex-1 relative bg-gray px-4 py-4 rounded-md max-w-[640px] w-full",
        containerStyle,
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={clsx(
            "flex items-center gap-4 justify-between w-[530px]",
            titleStyle,
          )}
        >
          {post.creator && (
            <User creator={post.creator} role={role} time={post.created_at} />
          )}
          <div className="hidden lg:block">
            <StatusBadge />
          </div>
        </div>
        {!productDetailsModal && (
          <ProductCardMenu
            dropDown={dropDown}
            postId={post.id}
            post_type={post.type}
          />
        )}
      </div>
      <div className="block lg:flex items-end justify-between">
        <div
          className={clsx(
            "relative xl:w-[550px] w-full mr-5 cursor-pointer",
            imgStyle,
          )}
          onClick={() => {
            setProductDetailsModal(!productDetailsModal);
            findProduct(post.id || "");
          }}
        >
          <Image
            src={
              post.assets && post.assets.length > 0
                ? post.assets[imgIndex].url
                : "/assets/images/no_image.png"
            }
            className={clsx(
              "mt-5 w-full object-cover cursor-pointer",
              imgStyle,
            )}
          />
          <IoIosArrowBack
            className="absolute top-1/2 left-2 md:hidden rounded-full z-50"
            color={imgIndex === 0 ? "gray" : "white"}
            size={24}
            onClick={(e) => {
              e.stopPropagation();
              prevImg();
            }}
          />
          <IoIosArrowForward
            className="absolute top-1/2 right-2 md:hidden rounded-full z-50"
            color={
              imgIndex === post.assets.length - 1 || post.assets.length === 0
                ? "gray"
                : "white"
            }
            size={24}
            onClick={(e) => {
              e.stopPropagation();
              nextImg();
            }}
          />
        </div>
        <div className="flex lg:contents items-center gap-2 justify-between">
          <ProductCardBadges
            isCreator={isCreator}
            statistics={post.statistics}
            post={post}
            actionStyle={actionStyle}
          />
          <div className="lg:hidden block">
            <StatusBadge />
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-2xl font-semibold mt-[22px]">
          {post.details?.title}
        </p>
        <div className="flex gap-3 items-center mt-4 justify-between">
          <div className="flex items-center">
            {/* {post.details && "price" in post.details && (
              <p className="opacity-50 line-through">
                $ {Number(post.details.price) + 20}
              </p>
            )} */}
            {post.details && "price" in post.details && (
              <p>$ {post.details.price}</p>
            )}
          </div>
          {post.details && "platform" in post.details && (
            <AvailableOnPlatform type={post.details.platform} />
          )}
        </div>
        <ProductDescription description={post.details?.description} />
        <div className="flex items-center gap-1 flex-wrap mt-1">
          <button
            className="opacity-70 text-sm cursor-pointer hover:opacity-100 transition-opacity"
            onClick={handleViewComments}
          >
            View {post?.statistics?.total?.comments} comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
