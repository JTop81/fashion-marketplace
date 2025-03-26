import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuthStore } from "setup/store/auth/authStore";
import { useBuyerFollowerStore } from "setup/store/profile/buyer/follower";

import FollowItem from "./FollowItem";

const FollowingSellers = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuthStore();
  const [searchFollowers, setSearchFollowers] = useState<string>("");
  const { followers, fetchFollowers, setFollowers } = useBuyerFollowerStore();
  const [cursor, setCursor] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchLoadMore = useCallback(
    async (cursor?: string) => {
      setIsLoading(true);
      try {
        const response = await fetchFollowers(user?.user_role.id || "", cursor);
        setFollowers(response.items);

        setCursor(response.cursor);
        setHasMore(response.items.length > 0);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFollowers, setFollowers, user?.user_role.id],
  );

  useEffect(() => {
    fetchLoadMore();
  }, [fetchLoadMore]);

  const filteredFollowers = useMemo(() => {
    if (!searchFollowers) return followers;

    return followers.filter((item) => {
      const boutiqueName = item.followed.user.username;
      return boutiqueName
        ?.toLowerCase()
        .includes(searchFollowers.toLowerCase());
    });
  }, [followers, searchFollowers]);

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
  }, [handleObserver]);

  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-2xl md:text-[28px] font-medium text-gray-800">
            Following
          </h2>
          <div className="w-full lg:w-auto">
            <div className="relative">
              <input
                className="w-full lg:w-[280px] h-[40px] bg-white rounded-full pl-4 pr-10 text-sm border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                type="text"
                value={searchFollowers}
                onChange={(e) => setSearchFollowers(e.target.value)}
                placeholder="Search..."
              />
              <CiSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        <p className="text-base md:text-lg text-gray-700">
          {filteredFollowers.length} Followings
        </p>
      </div>

      {/* Content Section */}
      <div className="mt-6 overflow-y-auto max-h-[calc(100vh-300px)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredFollowers.map((item) => (
            <FollowItem key={item.id} item={item} />
          ))}
          <div ref={observerRef} />
        </div>
        {isLoading && filteredFollowers.length === 0 && (
          <div className="text-center py-4 text-gray-500">Loading...</div>
        )}
        {!hasMore && filteredFollowers.length === 0 && (
          <div className="text-center py-4 text-gray-500">No followers</div>
        )}
      </div>
    </div>
  );
};

export default FollowingSellers;
