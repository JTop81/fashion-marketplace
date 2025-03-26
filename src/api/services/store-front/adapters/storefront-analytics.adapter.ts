import { IStoreFrontAnalytics } from "../interfaces/storefront-analytics.interface";
import { IStoreFrontAnalyticsResponse } from "../interfaces/storefront-analytics-response.interface";

export const storeFrontAnalyticsAdapter = (
  storeFrontAnalyticsResponse: IStoreFrontAnalyticsResponse,
): IStoreFrontAnalytics => {
  return {
    averageResponseTime: storeFrontAnalyticsResponse.average_response_time,
    numOfFollowers: storeFrontAnalyticsResponse.num_of_followers,
    totalActiveItems: storeFrontAnalyticsResponse.total_active_items,
    totalImpressions: storeFrontAnalyticsResponse.total_impressions,
    updatedAt: new Date(storeFrontAnalyticsResponse.updated_at),
    is_follower: storeFrontAnalyticsResponse.is_follower,
  };
};
