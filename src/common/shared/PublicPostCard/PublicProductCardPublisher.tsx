import React, { useEffect } from "react";
import { Plus, TickSquare } from "react-iconly";
import { IUserRoleResponse } from "api/services/posts/interfaces/post-response.interface";
import { Role } from "enums/role";
import { useBuyerFollowerStore } from "setup/store/profile/buyer/follower";
import { formatTimeAgo } from "utils/formatTime";

import Image from "pages/buyer-home/post-details/components/Image";

interface UserProps {
  creator: IUserRoleResponse;
  role?: Role;
  detail?: boolean;
  time?: string | number;
}

const PublicProductCardPublisher: React.FC<UserProps> = ({
  creator,
  detail,
  time,
}) => {
  const { stats, fetchStats } = useBuyerFollowerStore();
  useEffect(() => {
    fetchStats(creator.id);
  }, [fetchStats, creator.id]);

  const formattedTime = time
    ? typeof time === "number"
      ? formatTimeAgo(
          new Date(Date.now() - time * 24 * 60 * 60 * 1000).toISOString(),
        )
      : formatTimeAgo(time)
    : null;

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          src={creator.user.avatar?.url as string}
          className="w-12 h-12 rounded-full"
        />
        <div className="absolute -right-2 top-1 bg-white rounded-md">
          <div className="cursor-pointer">
            {stats.is_follower ? (
              <TickSquare filled={true} primaryColor="#9F00D9" size={20} />
            ) : (
              <Plus filled={true} primaryColor="#9F00D9" size={20} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-semibold line-clamp-2">
          {detail
            ? creator.user.username.slice(0, 20)
            : creator.user.username.slice(0, 15)}
        </p>
        {formattedTime && (
          <p className="text-sm text-gray-500">{formattedTime}</p>
        )}
      </div>
    </div>
  );
};

export default PublicProductCardPublisher;
