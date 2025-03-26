import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBuyerFollower } from "api/services/follower/interfaces/followers.interface";
import PropTypes from "prop-types";
import { useBuyerFollowerStore } from "setup/store/profile/buyer/follower";

import Image from "pages/buyer-home/post-details/components/Image";

interface ItemProps {
  item: IBuyerFollower;
}

const FollowItem: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const { deleteFollow, createFollow, fetchStats } = useBuyerFollowerStore();
  const [isFollowing, setIsFollowing] = useState(true); // Start with true since these are following items

  const handleClick = useCallback(async () => {
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    try {
      if (newFollowState) {
        await createFollow(item.followed_id);
      } else {
        await deleteFollow(item.followed_id);
      }
    } catch (error) {
      // Revert state on error
      setIsFollowing(!newFollowState);
      console.error("Failed to update follow status:", error);
    }
  }, [createFollow, deleteFollow, item.followed_id, isFollowing]);

  useEffect(() => {
    // Fetch initial follow status
    fetchStats(item.followed_id).then((stats) => {
      if (stats) {
        setIsFollowing(stats.is_follower);
      }
    });
  }, [fetchStats, item.followed_id]);

  const handleGoStore = useCallback(() => {
    navigate(`/store-front/${item.followed_id}`);
  }, [item.followed_id, navigate]);

  return (
    <div
      onClick={handleGoStore}
      className="group/card flex flex-col p-4 rounded-xl border border-gray-200 cursor-pointer [&:not(:has(button:hover))]:hover:border-primary/20 [&:not(:has(button:hover))]:hover:bg-primary/5 transition-all duration-200"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="shrink-0">
          <Image
            src={item.followed.user.avatar?.url || "/default-avatar.png"}
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-base font-medium text-gray-800 truncate">
            {item.followed.user.username}
          </h3>
          <p className="text-xs text-gray-500 truncate">34 products</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          className={`w-full px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap hover:bg-primary/5 ${
            isFollowing
              ? "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
              : "border-primary text-primary hover:border-primary/20"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

// Add PropTypes for validation
FollowItem.propTypes = {
  item: PropTypes.any.isRequired,
};

export default FollowItem;
