export interface IPostStatisticsActivityResponse {
  count_reactions: number;
  count_saves: number;
  count_comments: number;
}
export interface IPostStatisticsResponse {
  total: IPostStatisticsActivityResponse;
  current_user: IPostStatisticsActivityResponse;
}
