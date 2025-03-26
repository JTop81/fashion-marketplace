import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Delete, Edit, Filter } from "react-iconly";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivities } from "api/services/post-activities";
import { ActivityType } from "api/services/post-activities/interfaces/activities-response.interface";
import { getPosts } from "api/services/posts";
import { IPost } from "api/services/posts/interfaces/post.interface";
import ChatPopUpContainer from "common/components/Chat/ChatPopupContainer";
import { ResponsiveContainer } from "common/components/Layout/ResponsiveContainer";
import LinkDropDown from "common/components/LinkDropdown";
import ProductCard from "common/shared/ProductCard";
import PostCardSkeleton from "common/shared/ProductCard/PostCardSkeleton";
import { Role } from "enums/role";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useAuthStore } from "setup/store/auth/authStore";
import useStoredPosts from "setup/store/posts";

import { commentFactory } from "pages/buyer-home/post-details/assets/comment";

import List from "./components/activity";
import Top from "./components/activity/ActivityTop";
import ChatList from "./components/chat";
import Input from "./components/Input";
import PostModal from "./components/PostModal/PostModal";
import ProductDetails from "./components/productDetails";

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

const SellerFeeds = () => {
  // const [postDetails, setPostDetails] = useState<IPost>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [searchPost, setSearchPost] = useState("");
  const comment = useMemo(() => commentFactory(10), []);
  const [productId] = useState<string | null>(null);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { enabledChats } = useFlags();

  const { posts, currentCursor, addNewPosts, setPostDetails, postDetails } =
    useStoredPosts();
  const [cursor, setCursor] = useState<string | undefined>(currentCursor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initial, setInitial] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const postLimit = 10;

  useEffect(() => {
    const handleBeforeUnload = () => {
      setProductDetailsModal(productDetailsModal);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [productDetailsModal]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setProductDetailsModal(productDetailsModal);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [productDetailsModal]);

  const fetchPosts = useCallback(
    async (cursor?: string) => {
      setIsLoading(true);
      try {
        const newPosts = await getPosts({ cursor });
        const lastUpdated = newPosts.cursor;
        if (lastUpdated === null) {
          setHasMore(false);
          return;
        }

        addNewPosts(newPosts.item, lastUpdated ? lastUpdated : "");
        setCursor(lastUpdated);
        setHasMore(newPosts.item.length === postLimit);

        Promise.all(
          newPosts.item.map(async (post) => {
            const comments = await getActivities({
              type: ActivityType.COMMENT,
              id: post.id,
            });

            queryClient.setQueryData(["getActivities", post.id], comments);
          }),
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [addNewPosts, queryClient],
  );

  useEffect(() => {
    if (!cursor || cursor === "") {
      fetchPosts();
    }
  }, [cursor, fetchPosts, postDetails]);

  const { data: productItem, isFetching } = useQuery({
    queryKey: ["getPosts", productId],
    queryFn: () => getPosts({}),
    retry: 1,
    enabled: !!productId,
  });

  useEffect(() => {
    if (productItem && productItem.item.length > 0) {
      setPostDetails(productItem.item[0]);
    }
  }, [productItem, setPostDetails]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        fetchPosts(cursor);
      }
    },
    [cursor, fetchPosts, hasMore, isLoading],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  const findProduct = useCallback(
    (productId: string) => {
      const selectedPost = posts.find((post) => post.id === productId);
      if (selectedPost) {
        setPostDetails(selectedPost);
      }
    },
    [posts, setPostDetails],
  );

  const handleModalClose = useCallback(() => {
    setProductDetailsModal(false);
  }, []);

  return (
    <div className="w-full h-screen">
      <ResponsiveContainer>
        {isModalOpen && <PostModal setIsModalOpen={setIsModalOpen} />}

        <div className="relative">
          <div className="w-full mt-8">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-2xl">
                All Posts ({posts?.length || 0})
              </p>
              <LinkDropDown setIsModalOpen={setIsModalOpen} />
            </div>
            <div className="flex items-center justify-between gap-4 mt-9">
              <Input
                className=""
                placeholder="Search Posts"
                value={searchPost}
                onChange={(e) => {
                  setSearchPost(e.target.value);
                }}
              />
              <div className="cursor-pointer">
                <Filter size={24} />
              </div>
            </div>

            <div className="block md:flex w-full mt-6 overflow-y-auto justify-center">
              <div className="space-y-8 xl:mr-[72px] md:mr-[24px] justify-items-center">
                {!posts.length ? (
                  <>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                  </>
                ) : (
                  posts
                    .filter((item) =>
                      item.details?.title
                        .toLowerCase()
                        .includes(searchPost.toLowerCase()),
                    )
                    .map((el: IPost) => (
                      <ProductCard
                        key={el.id}
                        dropDown={dropDown}
                        role={user?.assigned_role.role_name || Role.PUBLIC}
                        isCreator={el.creator_id === user?.user_role.id}
                        post={el}
                        productDetailsModal={productDetailsModal}
                        setProductDetailsModal={setProductDetailsModal}
                        findProduct={findProduct}
                        containerStyle="sm:max-w-[640px] md:max-w-[420px] xl:max-w-[550px]"
                        titleStyle="lg:w-full xl:w-[450px]"
                        imgStyle="lg:w-[330px] mr-0 xl:mr-5 xl:w-[450px]"
                        actionStyle="lg:w-min"
                      />
                    ))
                )}
                {isLoading && <p className="text-center">Loading...</p>}
                {!hasMore && <p className="text-center">No more posts</p>}
              </div>

              <div className="max-w-[250px] 2xl:max-w-[375px] hidden md:block">
                <div className="bg-gray px-6 py-4 rounded-md w-full">
                  <Top title="Recent order updates" />
                  <div className="mt-3 h-80 overflow-y-scroll">
                    {comment.map((el) => (
                      <div key={el.id}>
                        <List
                          title={el.seller.name}
                          description={el.content.slice(0, 25)}
                          numberofUpdate={1}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="bg-gray px-6 py-4 rounded-md w-full">
                    <Top title="New chat" />
                    <div className="mt-5 h-80 overflow-y-scroll">
                      {comment.map((el) => (
                        <div key={el.id}>
                          <ChatList
                            image={el.seller.avatar}
                            title={el.seller.name}
                            description={el.content.slice(0, 20)}
                            numberofUpdate={1}
                            time={el.created_at}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {productDetailsModal && postDetails && !isFetching && (
            <ProductDetails
              dropDown={dropDown}
              role={user?.assigned_role.role_name || Role.BOUTIQUE}
              post={postDetails}
              onModalClose={handleModalClose}
              initial={initial}
              setInitial={(v: boolean) => setInitial(v)}
            />
          )}

          {enabledChats && (
            <ChatPopUpContainer
              role={user?.assigned_role.role_name || Role.BOUTIQUE}
            />
          )}
          <div ref={observerRef} className="h-[10px]" />
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerFeeds;
