import { getAxiosInstance } from "api/axios";
import { BUYER_FOLLOW } from "api/constants/endpoints.constants";

import { followersAdapter } from "./adapters/followers.adapter";
import { IBuyerFollowerResponse } from "./interfaces/followers.interface";

export const toggleFollow = async (id: string): Promise<void> => {
  const api = await getAxiosInstance();
  const response = await api.post(BUYER_FOLLOW + `?followed_id=${id}`);
  return response.data;
};
/**
 * Get a list of followers for a given user
 * @param id The user to query followers for
 * @returns A promise resolving to an array of followers
 */
export const getFollowers = async (
  id: string,
  cursor?: string,
): Promise<IBuyerFollowerResponse> => {
  const api = await getAxiosInstance();
  const response = await api.get<IBuyerFollowerResponse>(
    BUYER_FOLLOW +
      (id ? `?filter={"follower_id": {"eq": "${id}"}}&` : "?") +
      (cursor ? `cursor=${cursor}` : ""),
  );
  return followersAdapter(response.data);
};
