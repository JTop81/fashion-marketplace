import {
  IStatistics,
  IStatisticsActivity,
} from "api/services/posts/interfaces/post-statistics.interface";
import {
  IPostStatisticsActivityResponse,
  IPostStatisticsResponse,
} from "api/services/posts/interfaces/post-statistics-response.interface";

export function adaptStatistics(
  statistics: IPostStatisticsResponse,
): IStatistics {
  const adaptActivity = (
    activity: IPostStatisticsActivityResponse,
  ): IStatisticsActivity => {
    const { count_reactions, count_comments, count_saves } = activity;
    return {
      reactions: count_reactions,
      saves: count_saves,
      comments: count_comments,
    };
  };

  return {
    total: adaptActivity(statistics.total),
    current_user: adaptActivity(statistics.current_user),
  };
}
