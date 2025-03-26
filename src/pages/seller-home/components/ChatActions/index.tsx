import { useCallback, useEffect } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
import PropTypes from "prop-types";
import { useBuyerFollowerStore } from "setup/store/profile/buyer/follower";

import Button from "./Button";

type ChatActionsProps = {
  id: string | undefined;
};

export const ChatActions: React.FC<ChatActionsProps> = ({ id }) => {
  const { deleteFollow, createFollow, stats, fetchStats, setStats } =
    useBuyerFollowerStore();

  const { enabledChats } = useFlags();
  const handleClick = useCallback(async () => {
    setStats({ ...stats, is_follower: !stats.is_follower });
    try {
      if (!stats) {
        await createFollow(id || "");
      } else {
        await deleteFollow(id || "");
      }
    } catch (error) {
      setStats({ ...stats, is_follower: stats.is_follower });
    }
  }, [createFollow, deleteFollow, id, setStats, stats]);

  useEffect(() => {
    fetchStats(id || "");
  }, [fetchStats, id]);
  return (
    <div className="flex items-center space-x-[10px]">
      <Button
        className="text-white !py-2 h-fit items-center gap-x-2 !bg-[#3b8bf1]"
        onClick={handleClick}
      >
        <span>{stats.is_follower ? "Unfollow" : "Follow"}</span>
      </Button>
      {enabledChats && (
        <Button className="items-center !py-2 text-nowrap !text-[#3b8bf1] !bg-white gap-x-2 h-fit border-2 border-[#1877f2]">
          <span>Chat with Seller</span>
        </Button>
      )}
    </div>
  );
};

// Add PropTypes for validation
ChatActions.propTypes = {
  id: PropTypes.string.isRequired,
};
