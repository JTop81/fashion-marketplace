import {
  CREATE_POST_URL,
  DELETE_POST_URL,
  GET_POSTS_URL,
  UPDATE_POST_URL,
} from "api/constants/endpoints.constants";
import {
  POST_ID_PARAM,
  POST_STATUS,
  POST_TYPE,
} from "api/constants/route-params.constants";
import { replaceUrlParams } from "utils/getUrlWithParams.util";

import { getAxiosInstance } from "../../axios";

import { postAdapter } from "./adapters/post.adapter";
import {
  ICustomCreateData,
  IDiscussiongCreateDate,
  IExternalCreateData,
  IPost,
  IProductCreateData,
} from "./interfaces/post.interface";
import {
  IPostResponse,
  IPostResponseWrapper,
} from "./interfaces/post-response.interface";

interface Filter {
  [key: string]: {
    eq: string;
  };
}

export const getPosts = async ({
  id,
  cursor,
}: {
  id?: string;
  cursor?: string;
}): Promise<{ item: IPost[]; cursor: string }> => {
  const api = await getAxiosInstance();
  const response = await api.get<IPostResponseWrapper>(
    GET_POSTS_URL +
      (id ? `?filter={"id": {"eq": "${id}"}}&` : "?") +
      (cursor ? `cursor=${cursor}` : ""),
  );

  return {
    item: response.data.items.map(postAdapter),
    cursor: response.data.cursor,
  };
};

export const getPostItem = async (id: string): Promise<IPost> => {
  const filter: Filter = {
    id: {
      eq: id,
    },
  };
  const api = await getAxiosInstance();
  const response = await api.get<IPostResponseWrapper>(GET_POSTS_URL, {
    params: {
      filter: JSON.stringify(filter),
    },
  });
  return postAdapter(response.data.items[0]);
};

// TODO: Add adapter for createProduct
export const createPost = async (
  post_type: string,
  post_status: string,
  data:
    | IProductCreateData
    | IExternalCreateData
    | ICustomCreateData
    | IDiscussiongCreateDate,
): Promise<IPost> => {
  const api = await getAxiosInstance();
  const response = await api.post<IPostResponse>(
    replaceUrlParams(CREATE_POST_URL, {
      [POST_TYPE]: post_type,
      [POST_STATUS]: post_status,
    }),
    data,
  );
  return postAdapter(response.data);
};

export const deletePost = async (postId: string) => {
  const api = await getAxiosInstance();
  const response = await api.delete(
    replaceUrlParams(DELETE_POST_URL, {
      [POST_ID_PARAM]: postId,
    }),
  );

  return response.data;
};

export const updatePost = async (
  post_id: string,
  data:
    | IProductCreateData
    | IExternalCreateData
    | ICustomCreateData
    | IDiscussiongCreateDate,
): Promise<IPost> => {
  const api = await getAxiosInstance();
  const response = await api.put<IPostResponse>(
    replaceUrlParams(UPDATE_POST_URL, { [POST_ID_PARAM]: post_id }),
    data,
  );

  return postAdapter(response?.data);
};
