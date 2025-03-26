import { useCallback, useEffect, useRef, useState } from "react";
import { Hide } from "react-iconly";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getFeeds } from "api/services/ai-search";
import {
  IFeedResponse,
  IFeedsResponse,
} from "api/services/ai-search/interfaces/ai-search-response.interface";
import { getActivities } from "api/services/post-activities";
import { ActivityType } from "api/services/post-activities/interfaces/activities-response.interface";
import { getPosts } from "api/services/posts";
import { IPost } from "api/services/posts/interfaces/post.interface";
import AISearchBoxContainer from "common/components/AISearchBox";
import ChatPopUpContainer from "common/components/Chat/ChatPopupContainer";
import { ResponsiveContainer } from "common/components/Layout/ResponsiveContainer";
import ProductCard from "common/shared/ProductCard";
import PostCardSkeleton from "common/shared/ProductCard/PostCardSkeleton";
import { Role } from "enums/role";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useAuthStore } from "setup/store/auth/authStore";
import useStoredPosts from "setup/store/posts";

import ProductDetails from "pages/seller-home/posts/components/productDetails";

import SavedItems from "./SavedItems";
import TrendingArtisans from "./TrendingArtisans";

const dropDown = [
  {
    icon: Hide,
    title: "Unfollow",
  },
];

// Validate that a post has all required fields
const isValidPost = (post: IPost): boolean => {
  if (!post || typeof post !== "object") return false;

  // Check required fields
  const requiredFields = [
    "id",
    "type",
    "creator_id",
    "creator",
    "status",
    "assets",
    "statistics",
    "created_at",
    "updated_at",
  ];

  for (const field of requiredFields) {
    if (!(field in post)) return false;
  }

  if (!post.details?.title) return false;

  return true;
};

const BuyerFeeds = () => {
  const {
    posts,
    currentCursor,
    addNewPosts,
    setPosts,
    postDetails,
    setPostDetails,
  } = useStoredPosts();
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { enabledChats } = useFlags();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [cursor, setCursor] = useState<string | undefined>(currentCursor);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const params = useParams();

  const [initial, setInitial] = useState<boolean>(false);

  const postLimit = 10;

  // Reset state when navigating to the same route
  useEffect(() => {
    setPosts([]);
    setCursor("");
    setHasMore(true);
    setIsLoading(false);
  }, [location.key, setPosts]);

  const fetchPosts = useCallback(
    async (cursor?: string) => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        let newPosts: IFeedsResponse | any;
        if (!params.ai_search_message_id) {
          newPosts = await getPosts({ cursor });
        } else {
          newPosts = await getFeeds(params.ai_search_message_id, cursor);
        }

        const lastUpdated = newPosts.cursor;
        if (lastUpdated === null) {
          setHasMore(false);
          return;
        }

        if (params.ai_search_message_id) {
          const posts: IPost[] =
            newPosts.items?.flatMap((feed: IFeedResponse) => feed.post) ?? [];
          const validPosts = posts.filter(isValidPost);
          addNewPosts(validPosts, lastUpdated ? lastUpdated : "");
        } else {
          const validPosts = newPosts.item.filter(isValidPost);
          addNewPosts(validPosts, lastUpdated ? lastUpdated : "");
        }

        setCursor(lastUpdated);
        setHasMore(newPosts.item.length === postLimit);
        Promise.all(
          newPosts.item.map(async (post: any) => {
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
    [addNewPosts, params.ai_search_message_id, queryClient, isLoading],
  );
  useEffect(() => {
    if (params.ai_search_message_id) {
      setCursor("");
      setPosts([]);
      setHasMore(true);
    }
  }, [params.ai_search_message_id, setPosts]);
  useEffect(() => {
    if (!cursor || cursor === "") {
      fetchPosts();
    }
  }, [cursor, fetchPosts]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ResponsiveContainer additionalClass="px-8">
        <div className="block md:flex w-full mt-6 pb-40">
          <div className="space-y-8 flex-1 xl:mr-[24px] 2xl:mr-[48px] justify-items-center overflow-hidden">
            {!posts.length ? (
              <>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </>
            ) : (
              posts
                ?.filter(isValidPost)
                .map((post: IPost, index: number) => (
                  <ProductCard
                    key={`feed-${post.id}-${index.toString()}`}
                    dropDown={dropDown}
                    role={user?.assigned_role.role_name || Role.PUBLIC}
                    isCreator={post.creator_id === user?.user_role.id}
                    post={post}
                    productDetailsModal={productDetailsModal}
                    setProductDetailsModal={setProductDetailsModal}
                    findProduct={findProduct}
                  />
                ))
            )}
            {isLoading && <p className="text-center">Loading...</p>}
            {!hasMore && <p className="text-center">No more posts</p>}
          </div>

          <div className="gap-12 relative flex-col overflow-y-auto hidden xl:flex xl:w-[312px]">
            <TrendingArtisans />
            <SavedItems userId={user?.id} />
          </div>
        </div>
      </ResponsiveContainer>

      {productDetailsModal && postDetails && (
        <ProductDetails
          dropDown={dropDown}
          role={user?.assigned_role.role_name || Role.BOUTIQUE}
          post={postDetails}
          onModalClose={handleModalClose}
          initial={initial}
          setInitial={(v: boolean) => setInitial(v)}
        />
      )}
      {enabledChats && <ChatPopUpContainer role={Role.SHOPPER} />}
      <div ref={observerRef} className="h-[10px]" />
      <AISearchBoxContainer
        role={user?.assigned_role.role_name}
        productDetailsModal={productDetailsModal}
      />
    </div>
  );
};

export default BuyerFeeds;
