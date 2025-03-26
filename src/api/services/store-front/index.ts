import { getAxiosInstance } from "api/axios";
import {
  ATTACH_OPTIONS_TO_USER,
  GET_ALL_PREFERENCES,
  GET_POST_ACTIVITIES_URL,
  GET_POSTS_URL,
  STATS_STORE_URL,
  STORE_FRONT_GET_PER_USER,
  UPDATE_USER_INFO,
} from "api/constants/endpoints.constants";
import {
  STORE_ID_PARAM,
  USER_ROLE_ID,
} from "api/constants/route-params.constants";
import { ContemporaryFashion, FastDelivery, Green, SecondHand } from "assets";
import { replaceUrlParams } from "utils/getUrlWithParams.util";

import { StoreFrontInfoForm } from "pages/seller-home/store-front/types";

import { categoriesAdapter } from "../customize/adapters/categories.adapter";
import { ICategoriesResponse } from "../customize/interfaces/categories.interface";
import {
  postActivityAdapter,
  postAdapter,
} from "../posts/adapters/post.adapter";
import {
  IPostActivitiesResponse,
  IPostActivitiesResponseWrapper,
  IPostData,
  IPostResponse,
  IPostResponseWrapper,
} from "../posts/interfaces/post-response.interface";
import { userAdapter } from "../users/adapters/users.adapter";
import { IUser } from "../users/interfaces/user.interface";

import { storeFrontAnalyticsAdapter } from "./adapters/storefront-analytics.adapter";
import { IStoreFrontAnalytics } from "./interfaces/storefront-analytics.interface";
import { IStoreFrontAnalyticsResponse } from "./interfaces/storefront-analytics-response.interface";
import { IStoreFrontInfoDetailResponse } from "./interfaces/storefront-details-response.interface";
interface Filter {
  [key: string]: {
    eq: string;
  };
}
export const getStoreFrontInfoDetail = async (
  id: string,
): Promise<IStoreFrontInfoDetailResponse> => {
  const filter: Filter = {
    id: {
      eq: id,
    },
  };
  const api = await getAxiosInstance();
  const response = await api.get<IStoreFrontInfoDetailResponse>(
    STORE_FRONT_GET_PER_USER,
    {
      params: {
        filter: JSON.stringify(filter),
      },
    },
  );
  return response?.data;
};

export const getStoreFrontPosts = async (
  id: string,
  userId: string,
  filterTab: string,
  isOwner?: boolean,
  cursor?: string,
): Promise<IPostData> => {
  const api = await getAxiosInstance();
  const upperFilterTab = filterTab.toLowerCase();

  const filter: Filter = {
    ...(isOwner || filterTab === "all"
      ? {
          creator_id: {
            eq: id,
          },
        }
      : { "post.creator_id": { eq: id }, creator_id: { eq: userId } }),
  };
  if (filterTab !== "all") {
    const filterKey = isOwner ? "status" : "type";
    filter[filterKey] = {
      eq: upperFilterTab,
    };
  }

  const url =
    isOwner || filterTab === "all" ? GET_POSTS_URL : GET_POST_ACTIVITIES_URL;
  const params: any = {
    limit: 10,
    filter: JSON.stringify(filter),
  };
  params.cursor = cursor;

  try {
    const response = await api.get<
      IPostResponseWrapper | IPostActivitiesResponseWrapper
    >(url, { params });
    if (!response.data || !response.data.items) {
      throw new Error("Response data is missing items");
    }
    if (isOwner || filterTab === "all") {
      return {
        items: (response.data.items as IPostResponse[]).map(postAdapter),
        total_count: response.data.items.length,
        limit: response.data.limit,
        cursor: response.data.cursor,
      };
    } else {
      return {
        items: (response.data.items as IPostActivitiesResponse[]).map(
          postActivityAdapter,
        ),
        total_count: response.data.items.length,
        limit: response.data.limit,
        cursor: response.data.cursor,
      };
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getStoreFrontUserCategories = async (
  id: string,
): Promise<ICategoriesResponse[]> => {
  const filter: any = {
    user_role_id: {
      eq: id,
    },
  };
  const api = await getAxiosInstance();
  const response = await api.get<any>(ATTACH_OPTIONS_TO_USER, {
    params: {
      filter: JSON.stringify(filter),
    },
  });
  const dataArr = response?.data.items;
  const imgUrls = [ContemporaryFashion, FastDelivery, Green, SecondHand];

  const updatedDataArr = dataArr.map((item: any) => {
    const randomIndex = Math.floor(Math.random() * imgUrls.length);
    return {
      ...item,
      option: {
        ...item.option,
        imgUrl: imgUrls[randomIndex],
      },
    };
  });
  const result = updatedDataArr.map((item: any) => item.option);
  return result;
};

export const updateUserInfo = async (
  id: string,
  StoreFrontInfoForm: StoreFrontInfoForm,
): Promise<IUser> => {
  const api = await getAxiosInstance();
  const response = await api.put<any>(
    replaceUrlParams(UPDATE_USER_INFO, { [USER_ROLE_ID]: id }),
    StoreFrontInfoForm,
  );
  return userAdapter(response?.data);
};

export const getStoreFrontAllCategories = async (): Promise<
  ICategoriesResponse[]
> => {
  const api = await getAxiosInstance();
  const response = await api.get<ICategoriesResponse[]>(GET_ALL_PREFERENCES);
  return categoriesAdapter(response?.data);
};

export const getStoreStats = async (
  id: string,
): Promise<IStoreFrontAnalytics> => {
  const api = await getAxiosInstance();
  const response = await api.get<IStoreFrontAnalyticsResponse>(
    replaceUrlParams(STATS_STORE_URL, { [STORE_ID_PARAM]: id }),
  );
  return storeFrontAnalyticsAdapter(response?.data);
};

export const updateUserAvatar = async (formData: FormData): Promise<void> => {
  const api = await getAxiosInstance();
  await api.post("/api/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const removeUserAvatar = async (): Promise<void> => {
  const api = await getAxiosInstance();
  await api.delete("/api/user/avatar");
};
