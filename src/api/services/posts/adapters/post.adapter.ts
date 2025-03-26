import { adaptStatistics } from "api/services/store-front/adapters/storefront-stats.adapter";

import { IPost } from "../interfaces/post.interface";
import {
  IPostActivitiesResponse,
  IPostResponse,
} from "../interfaces/post-response.interface";

export const postAdapter = (response: IPostResponse): IPost => {
  const { statistics, ...rest } = response;
  return {
    ...rest,
    statistics: adaptStatistics(statistics),
  };
};

export const postActivityAdapter = (
  response: IPostActivitiesResponse,
): IPost => {
  return {
    id: response.post.id,
    type: response.post.type,
    creator_id: response.post.creator_id,
    creator: response.creator, // Note that we use creator from IPostActivitiesResponse
    status: response.post.status,
    details: response.post.details,
    assets: response.post.assets,
    statistics: adaptStatistics(response.statistics),
    preferences: response.post.preferences,
    created_at: response.created_at,
    updated_at: response.updated_at,
  };
};
