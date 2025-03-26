export interface IStatisticsActivity {
  reactions: number;
  saves: number;
  comments: number;
}
export interface IStatistics {
  total: IStatisticsActivity;
  current_user: IStatisticsActivity;
}
