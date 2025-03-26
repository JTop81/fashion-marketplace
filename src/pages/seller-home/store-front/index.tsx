import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getStoreFrontInfoDetail,
  getStoreFrontUserCategories,
} from "api/services/store-front";
import {
  IStoreFrontInfoDetailItem,
  IStoreFrontInfoDetailResponse,
} from "api/services/store-front/interfaces/storefront-details-response.interface";
import { GeneralModal } from "common/components/GeneralModal";
import Loader from "common/components/Loader";
import Share from "common/components/Share";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";

import FrameButton from "./components/FrameButton";
import StoreFormModal from "./components/StoreFormModal";
import StoreFrontInfo from "./components/StoreFrontInfo";
import StoreFrontPosts from "./components/StorePosts";

export default function StoreFront() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [storeFrontInfoData, setStoreFrontInfoData] =
    useState<IStoreFrontInfoDetailItem>();
  const { user } = useAuthStore();

  const isOwner = useMemo(() => {
    return (
      user?.user_role.id === id || user?.assigned_role.role_name === Role.ADMIN
    );
  }, [id, user?.assigned_role.role_name, user?.user_role.id]);

  const { data, isFetching, isError } = useQuery<IStoreFrontInfoDetailResponse>(
    {
      queryKey: ["getStoreFrontInfoDetail", id, storeFrontInfoData],
      queryFn: () => getStoreFrontInfoDetail(id || ""),
      retry: 1,
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    },
  );

  const { data: categories } = useQuery<any>({
    queryKey: ["getStoreFrontUserCategories"],
    queryFn: () => getStoreFrontUserCategories(user?.user_role.id || ""),
    retry: 1,
    enabled: !!user?.user_role.id,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  useEffect(() => {
    if (data && Array.isArray(data.items) && data.items.length > 0) {
      setStoreFrontInfoData(data.items[0]);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError, navigate]);

  if (isFetching || !storeFrontInfoData) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-[1200px] mx-auto lg:pt-10 lg:px-8 pt-4 px-4">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6 w-full">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-[10px] cursor-pointer hover:opacity-75 transition-opacity"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="font-semibold leading-6 lg:text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Store
            </h3>
          </div>

          <div className="flex items-center space-x-3 lg:hidden">
            <Share
              url={window.location.href}
              title={`Check out ${storeFrontInfoData?.user?.username}'s store`}
              description={storeFrontInfoData?.details?.bio || ""}
            />
            <FrameButton
              setEditModalOpen={setEditModalOpen}
              isOwner={isOwner}
            />
          </div>
        </div>

        {/* Body */}
        <div className="bg-white rounded-xl shadow-sm w-full">
          <div className="p-6 pb-0">
            <StoreFrontInfo
              categories={categories}
              isOwner={isOwner}
              setEditModalOpen={setEditModalOpen}
              data={storeFrontInfoData}
            />
          </div>

          <div className="p-6">
            <StoreFrontPosts isOwner={isOwner} />
          </div>
        </div>
      </div>

      <GeneralModal
        isOpen={editModalOpen}
        closeModal={() => setEditModalOpen(false)}
        title="Edit Store-front"
      >
        <StoreFormModal
          editModalOpen={editModalOpen}
          categories={categories}
          setEditModalOpen={setEditModalOpen}
          storeFrontInfoData={storeFrontInfoData}
          setStoreFrontInfoData={setStoreFrontInfoData}
        />
      </GeneralModal>
    </div>
  );
}
