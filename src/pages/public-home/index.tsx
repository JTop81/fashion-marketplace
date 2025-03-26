import { useCallback, useState } from "react";
import { Hide } from "react-iconly";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "api/services/posts";
import { IPost } from "api/services/posts/interfaces/post.interface";
import AISearchBoxContainer from "common/components/AISearchBox";
import { ResponsiveContainer } from "common/components/Layout/ResponsiveContainer";
import PopupAuth from "common/components/PopupAuth";
import PostCardSkeleton from "common/shared/ProductCard/PostCardSkeleton";
import PublicPostCard from "common/shared/PublicPostCard";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";

import ProductDetails from "pages/seller-home/posts/components/productDetails";

import OnboardingModal from "./components/Onboarding";

const dropDown = [
  {
    icon: Hide,
    title: "Unfollow",
  },
];
const PublicFeeds = () => {
  const [productDetails, setProductDetails] = useState<IPost>();
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [initial, setInitial] = useState<boolean>(false);
  const { authSection, setAuthSection, user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => getPosts({}),
    retry: 1,
  });

  const findProduct = (postId: string) => {
    const foundPosts = data?.item.find((post: IPost) => post.id === postId);
    if (foundPosts) {
      setProductDetails(foundPosts);
    }
  };

  const handleModalClose = useCallback(() => {
    setProductDetailsModal(false);
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="border-t opacity-10"></div>
      <PopupAuth
        isOpen={authSection !== null}
        closeModal={() => setAuthSection(null)}
      />
      <OnboardingModal />
      <ResponsiveContainer additionalClass="px-4">
        <div className="block md:flex w-full mt-6 pb-40">
          <div
            className="space-y-8 xl:mr-[72px] md:mr-[48px]"
            onClick={(e) => {
              e.stopPropagation();
              setAuthSection("login");
            }}
          >
            {isLoading ? (
              <>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </>
            ) : (
              data?.item.map((post: IPost) => (
                <PublicPostCard
                  key={post.id}
                  dropDown={dropDown}
                  role={Role.PUBLIC}
                  post={post}
                  time={2}
                  productDetailsModal={productDetailsModal}
                  setProductDetailsModal={setProductDetailsModal}
                  findProduct={findProduct}
                />
              ))
            )}
          </div>
        </div>
      </ResponsiveContainer>

      {productDetailsModal && productDetails && (
        <ProductDetails
          dropDown={dropDown}
          role={Role.SHOPPER}
          post={productDetails}
          onModalClose={handleModalClose}
          initial={initial}
          setInitial={(v: boolean) => setInitial(v)}
        />
      )}
      <AISearchBoxContainer
        cover={authSection !== null}
        role={user?.assigned_role.role_name}
        productDetailsModal={productDetailsModal}
      />
    </div>
  );
};

export default PublicFeeds;
