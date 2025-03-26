import React, { useState } from "react";
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
import DropDown from "common/shared/ProductCard/ProductCardMenu";
import ProductCardPublisher from "common/shared/ProductCard/ProductCardPublisher";
import { Role } from "enums/role";
import DropDownProps from "types/productDropDown";

interface ProductInfoProps {
  post: IPost;
  dropDown: DropDownProps[];
  role?: Role;
  isCreator?: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  post,
  dropDown,
  isCreator = false,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<PostStatus>(post.status);

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
  };

  const StatusBadgeWithDropdown = () => {
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
    <>
      <div className="flex justify-between w-full gap-1 sm:gap-2">
        <ProductCardPublisher
          creator={post.creator}
          detail
          time={post.created_at}
        />
        <div className="flex items-center gap-1 sm:gap-3">
          {isCreator ? <StatusBadgeWithDropdown /> : <StatusBadge />}
          <DropDown
            dropDown={dropDown}
            postId={post.id}
            post_type={post.type}
          />
        </div>
      </div>
      <p className="text-2xl font-semibold mt-5">{post.details?.title}</p>
      <p className={`opacity-50 mt-4`}>{post.details?.description}</p>
      <div className="flex gap-3 items-center mt-4 flex-wrap justify-between">
        <div className="flex items-center">
          {/* <p className="opacity-50 text-lg lg:text-3xl line-through">
            {post.details &&
              "price" in post.details &&
              `$${post.details.price + 20}`}
          </p> */}
          {post.details && "price" in post.details && (
            <p className="text-lg lg:text-3xl">$ {post.details.price}</p>
          )}
        </div>

        {post.details && "platform" in post.details && (
          <AvailableOnPlatform type={post.details.platform} />
        )}
      </div>
    </>
  );
};

export default ProductInfo;
