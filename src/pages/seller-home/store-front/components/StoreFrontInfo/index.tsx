import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStoreStats } from "api/services/store-front";
import { IStoreFrontAnalytics } from "api/services/store-front/interfaces/storefront-analytics.interface";
import { IStoreFrontInfoDetailItem } from "api/services/store-front/interfaces/storefront-details-response.interface";
import Share from "common/components/Share";
import { useAuthStore } from "setup/store/auth/authStore";

import { ChatActions } from "pages/seller-home/components/ChatActions";

import { Category } from "../../types";
import EditButton from "../EditButton";
import FrameButton from "../FrameButton";

import Categories from "./Categories";
import StoreAnalytics from "./StoreAnalytics";
import StoreAvatar from "./StoreAvatar";
import StoreWebsites from "./StoreWebsites";

type StoreFrontInfoProps = {
  categories: Category[];
  isOwner: boolean;
  data: IStoreFrontInfoDetailItem;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StoreFrontDetails(props: StoreFrontInfoProps) {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { data, setEditModalOpen, isOwner, categories } = props;
  const [moreDesc, setMoreDesc] = useState(false);
  const handleMoreDesc = () => setMoreDesc((prev) => !prev);
  const { data: analytics } = useQuery<IStoreFrontAnalytics>({
    queryKey: ["getStoreStats", id],
    queryFn: () => getStoreStats(user?.user_role.id || ""),
    retry: 1,
    enabled: !!id,
  });

  // Safely get the avatar URL
  const avatarUrl = data?.user?.avatar?.url || "";

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
      <div className="flex-shrink-0 mb-6 lg:mb-0">
        <StoreAvatar avatar={avatarUrl} isOwner={isOwner} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col items-center lg:items-start">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center justify-center w-full lg:justify-start lg:w-auto gap-4">
              <h2 className="text-2xl font-bold text-gray-800 hover:text-gray-700 transition-colors text-center lg:text-left">
                {data?.user?.username}
              </h2>
              {isOwner && (
                <div className="transform hover:scale-105 transition-transform">
                  <EditButton setEditModalOpen={setEditModalOpen} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <Share
                  url={window.location.href}
                  title={`Check out ${data?.user?.username}'s store`}
                  description={data?.details?.bio || ""}
                />
              </div>
              <div className="hidden lg:block">
                <FrameButton
                  setEditModalOpen={setEditModalOpen}
                  isOwner={isOwner}
                />
              </div>
            </div>
          </div>

          {/* <div className={`mt-4 w-full ${isOwner ? 'bg-blue-50 p-4 rounded-lg' : ''}`}> */}
          <p className="text-sm hidden lg:block max-w-[550px] leading-relaxed text-gray-600">
            {data?.details?.bio}
          </p>

          <p className="text-gray-600 text-sm mt-2 text-center max-w-[265px] lg:hidden">
            {moreDesc
              ? data?.details?.bio
              : data?.details?.bio?.substring(0, 32) + "... "}
            <span
              onClick={handleMoreDesc}
              className={`${moreDesc ? "ml-1" : ""} text-blue-600 underline cursor-pointer hover:text-blue-700 transition-colors`}
            >
              {moreDesc ? "Less" : "More"}
            </span>
          </p>
          {/* </div> */}
        </div>

        <div className="flex flex-col-reverse gap-3 items-center lg:justify-between lg:flex-row lg:items-start mt-6">
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <FiMapPin className="mr-2 text-gray-600" size={20} />
            <span className="text-sm font-medium text-gray-700">
              {data?.details?.address1}
              {data?.details?.address2 && `, ${data?.details?.address2}`}
            </span>
          </div>
          {!isOwner && (
            <div className="transform hover:scale-105 transition-transform">
              <ChatActions id={id} />
            </div>
          )}
        </div>

        {categories && (
          <div className="mt-6">
            <Categories categories={categories} />
          </div>
        )}

        {data?.details?.websites && (
          <div className="mt-6">
            <StoreWebsites storeWebsites={data.details.websites} />
          </div>
        )}

        {analytics && (
          <div className="mt-6">
            <StoreAnalytics analytics={analytics} />
          </div>
        )}
      </div>
    </div>
  );
}
