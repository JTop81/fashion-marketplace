import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Delete, Edit } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { IPost } from "api/services/posts/interfaces/post.interface";
import { getStoreFrontPosts } from "api/services/store-front";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";

import ProductDetails from "pages/seller-home/posts/components/productDetails";

import { StoreFrontPostsOption } from "../../types";

import { SellerSideOptions } from "./options/SellerSideOptions";
import { ShopperSideOptions } from "./options/ShopperSideOptions";
import StoreFrontPostCard from "./StoreFrontPostCard";
import StoreFrontPostsHeader from "./StoreFrontPostsHeader";

import "react-loading-skeleton/dist/skeleton.css";

type isOwner = {
  isOwner?: boolean;
};

const dropDown = [
  {
    icon: Edit,
    title: "Edit",
  },
  {
    icon: Delete,
    title: "Delete",
  },
];

export default function StoreFrontPosts(props: isOwner) {
  const { id } = useParams();
  const { isOwner } = props;
  const [postList, setPostList] = useState<IPost[]>([]);
  const [selected, setSelected] = useState<StoreFrontPostsOption>(
    isOwner ? SellerSideOptions[0] : ShopperSideOptions[0],
  );
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [postDetails, setPostDetails] = useState<IPost>();
  const [cursor, setCursor] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initial, setInitial] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchLoadMore = useCallback(
    async (cursor?: string) => {
      setIsLoading(true);
      try {
        const response = await getStoreFrontPosts(
          id || "",
          user?.user_role.id || "",
          selected.value,
          isOwner,
          cursor,
        );
        setPostList((prev) => [...prev, ...response.items]);
        setCursor(response.cursor);
        setHasMore(response.items.length > 0);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [id, isOwner, selected.value, user?.user_role.id],
  );
  useEffect(() => {
    setHasMore(true);
    fetchLoadMore();
    setPostList([]);
  }, [fetchLoadMore, setHasMore, selected.value]);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        fetchLoadMore(cursor);
      }
    },
    [cursor, fetchLoadMore, hasMore, isLoading],
  );
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleObserver, isLoading]);
  const handleOptionChange = (btn: StoreFrontPostsOption) => setSelected(btn);
  const handleInputChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return postList;

    return postList.filter((post: IPost) =>
      post.details?.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [postList, searchTerm]);

  const findProduct = (postId: string) => {
    if (!filteredPosts || filteredPosts.length === 0) return;

    const foundPost = filteredPosts.find((post: IPost) => post.id === postId);

    if (foundPost) {
      setPostDetails(foundPost);
    }
  };

  const handleModalClose = useCallback(() => {
    setProductDetailsModal(false);
  }, []);

  return (
    <section className="flex flex-col lg:flex-col lg:mt-11 my-6">
      <StoreFrontPostsHeader
        isOwner={isOwner}
        handleOptionSelection={handleOptionChange}
        ShopperSideOptions={ShopperSideOptions}
        SellerSideOptions={SellerSideOptions}
        searchTerm={searchTerm}
        selected={selected}
        handleInputChange={handleInputChange}
      />
      <div className="w-full min-h-0 flex-1 overflow-auto scrollbar-thin">
        {isLoading && filteredPosts.length === 0 && (
          <div className="w-full grid grid-cols-5 gap-5">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  className="
                  cursor-pointer
                  relative w-full h-[150px]
                  sm:h-[230px]
                  md:h-[260px]"
                  key={`demo-${index.toString()}`}
                />
              ))}
          </div>
        )}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">No Posts</p>
          </div>
        )}
        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {filteredPosts?.map((post: IPost, index: number) => (
              <div key={index + post.id} className="w-[90%] mx-auto sm:w-full">
                <div className="aspect-square w-full">
                  <StoreFrontPostCard
                    dropDown={dropDown}
                    post={post}
                    role={user?.assigned_role.role_name}
                    isCreator={post.creator.id === user?.user_role.id}
                    time={2}
                    productDetailsModal={productDetailsModal}
                    setProductDetailsModal={setProductDetailsModal}
                    findProduct={findProduct}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && hasMore && filteredPosts.length > 0 && (
          <div ref={observerRef} className="mt-4" />
        )}
        {!isLoading && !hasMore && filteredPosts.length > 0 && (
          <p className="text-center text-gray-500 mt-5">No more Posts</p>
        )}
      </div>

      {productDetailsModal && postDetails && (
        <ProductDetails
          isOwner={isOwner}
          dropDown={dropDown}
          role={user?.assigned_role.role_name || Role.BOUTIQUE}
          post={postDetails}
          onModalClose={handleModalClose}
          initial={initial}
          setInitial={(v: boolean) => setInitial(v)}
        />
      )}
    </section>
  );
}
