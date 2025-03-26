import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";

import { Seller } from "./seller";

export type Comment = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  seller: Seller;
  parent_comment_id?: string;
  replies?: Comment[];
  statistics: IStatistics;
  replyCount?: number;
};
