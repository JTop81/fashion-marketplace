import { FC, useMemo } from "react";
import { IUserRoleResponse } from "api/services/posts/interfaces/post-response.interface";
import { formatTimeAgo } from "utils/formatTime";

interface TimeDayInfoProps {
  creator: IUserRoleResponse;
  time: string | number;
}

const TimeInfo: FC<TimeDayInfoProps> = ({ creator, time }) => {
  const formattedTime = useMemo(() => {
    if (typeof time === "number") {
      // If time is a number (legacy support), create a date that many days ago
      const date = new Date();
      date.setDate(date.getDate() - time);
      return formatTimeAgo(date.toISOString());
    }
    return formatTimeAgo(time);
  }, [time]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <p className="text-sm text-gray-500">{formattedTime}</p>
    </div>
  );
};

export default TimeInfo;
