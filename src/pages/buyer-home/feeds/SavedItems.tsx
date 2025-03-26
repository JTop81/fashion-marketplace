import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { getLikeActivities } from "api/services/post-activities";
import { ActivityType } from "api/services/post-activities/interfaces/activities-response.interface";
import useStoredSavedPost from "setup/store/activities";

type SavedItemsProps = {
  userId: string | undefined;
};

const SavedItems: FC<SavedItemsProps> = ({ userId }) => {
  const {
    posts,
    currentCursor,
    addNewSavedPosts,
    deleteStoredSavedPost,
    clearStoredSavedPosts,
  } = useStoredSavedPost();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string | undefined>(currentCursor);
  const isInitialLoad = useRef(true);

  const postLimit = 5;

  const fetchSavedItems = useCallback(
    async (
      id: string | undefined,
      isUser: boolean,
      newCursor?: string,
      isStart?: boolean,
    ) => {
      if (id === undefined) return;
      setIsLoading(true);
      try {
        const response = await getLikeActivities({
          type: ActivityType.SAVE,
          id,
          isUser,
          cursor: newCursor,
        });

        if (response.cursor === null && isUser) {
          setHasMore(false);
          return;
        }

        // Only update cursor if this is a user's paginated request
        if (isUser && !isStart) {
          setCursor(response.cursor);
          setHasMore(response.items.length === postLimit);
        }

        // Add the items to the store
        addNewSavedPosts(response.items, response.cursor, isStart);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [addNewSavedPosts],
  );

  // Initial load and pagination
  useEffect(() => {
    if (isInitialLoad.current && userId) {
      fetchSavedItems(userId, true, "", true);
      isInitialLoad.current = false;
    }
  }, [userId, fetchSavedItems]);

  // Handle save/unsave events
  useEffect(() => {
    const saveHandler = async (event: Event) => {
      if (event instanceof CustomEvent && userId) {
        // Clear existing posts before fetching new ones
        clearStoredSavedPosts();
        // Fetch all saved items fresh
        await fetchSavedItems(userId, true, "", true);
      }
    };

    window.addEventListener("addSavedPostInList", saveHandler);
    return () => {
      window.removeEventListener("addSavedPostInList", saveHandler);
    };
  }, [userId, fetchSavedItems, clearStoredSavedPosts]);

  const deleteSavedPost = async (id: string) => {
    const customEvent = new CustomEvent("removeSavedItemInList", {
      detail: { id },
    });
    window.dispatchEvent(customEvent);
    deleteStoredSavedPost(id);
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading && cursor) {
        fetchSavedItems(userId, true, cursor);
      }
    },
    [cursor, fetchSavedItems, hasMore, isLoading, userId],
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

  return (
    <div className="relative w-full rounded-xl bg-card flex flex-col flex-wrap items-stretch justify-start p-4 pr-4 shadow-sm">
      <div className="flex items-center gap-12 mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Saved Items</h3>
        <span className="text-sm text-primary">{posts.length} items</span>
      </div>

      <div className="flex flex-col gap-4 h-[280px] overflow-y-auto scrollbar-none">
        {posts.map((item) => (
          <div
            key={`saved-item-${item.post.id}`}
            className="group relative flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <img
                  alt={item.post.details?.title || ""}
                  src={
                    item.post.assets && item.post.assets.length > 0
                      ? item.post.assets[0].url
                      : "/assets/images/no_image.png"
                  }
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <div className="font-medium text-text-primary truncate">
                  {item.post.details?.title}
                </div>
                {item.post.details && "price" in item.post.details && (
                  <div className="text-sm font-semibold text-primary mt-0.5">
                    ${item.post.details.price}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => deleteSavedPost(item.post.id)}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0"
              aria-label="Remove item"
            >
              <IoCloseOutline
                size={20}
                className="text-gray-500 hover:text-red-500 transition-colors"
              />
            </button>
          </div>
        ))}

        {!isLoading && hasMore && (
          <div ref={observerRef} className="h-[10px]" />
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!hasMore && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="text-gray-400 mb-2">No saved items yet</div>
            <div className="text-sm text-gray-400">
              Items you save will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedItems;
