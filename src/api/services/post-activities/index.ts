import {
  DELETE_POSTS_ACTIVITIES_URL,
  POSTS_ACTIVITIES_URL,
} from "api/constants/endpoints.constants";
import { ACTIVITY_ID_PARAM } from "api/constants/route-params.constants";
import { replaceUrlParams } from "utils/getUrlWithParams.util";

import { getAxiosInstance } from "../../axios";
import {
  IPostActivitiesResponse,
  IPostActivitiesResponseWrapper,
} from "../posts/interfaces/post-response.interface";

import {
  ActivityType,
  IActivityBody,
} from "./interfaces/activities-response.interface";

export const getActivities = async ({
  type,
  cursor,
  id,
}: {
  type: ActivityType;
  id: string;
  cursor?: string;
}): Promise<{ items: IPostActivitiesResponse[]; cursor: string }> => {
  const api = await getAxiosInstance();

  const response = await api.get<IPostActivitiesResponseWrapper>(
    POSTS_ACTIVITIES_URL +
      `?filter={"type": {"eq": "${type}"}, "target_id": {"eq": "${id}"}}` +
      (cursor ? `&cursor=${cursor}` : "") +
      "&limit=5",
  );

  return { items: response.data.items, cursor: response.data.cursor };
};

export const getLikeActivities = async ({
  type,
  cursor,
  id,
  isUser,
}: {
  type: ActivityType;
  id: string;
  isUser: boolean;
  cursor?: string;
}): Promise<{ items: IPostActivitiesResponse[]; cursor: string }> => {
  const api = await getAxiosInstance();

  const response = await api.get<IPostActivitiesResponseWrapper>(
    POSTS_ACTIVITIES_URL +
      `?filter={"type": {"eq": "${type}"}, "${isUser ? "creator.user_id" : "post.id"}": {"eq": "${id}"}}` +
      (cursor ? `&cursor=${cursor}` : "") +
      "&limit=5",
  );

  return { items: response.data.items, cursor: response.data.cursor };
};

export const createActivity = async (
  body: IActivityBody,
): Promise<IPostActivitiesResponse> => {
  const api = await getAxiosInstance();
  const response = await api.post(POSTS_ACTIVITIES_URL, body);
  return response.data;
};

export const deleteActivity = async (
  activityId: string,
): Promise<IPostActivitiesResponse> => {
  const api = await getAxiosInstance();
  const response = await api.delete(
    replaceUrlParams(DELETE_POSTS_ACTIVITIES_URL, {
      [ACTIVITY_ID_PARAM]: activityId,
    }),
  );

  return response.data;
};
