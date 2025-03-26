// userApi.ts
import { getAxiosInstance } from "api/axios";
import {
  ATTACH_OPTIONS_TO_USER,
  ATTACH_ROLE_TO_USER,
  GET_ROLES,
  UPDATE_USER,
  USER_INIT,
  USER_ME,
} from "api/constants/endpoints.constants";
import { USER_ID_PARAM } from "api/constants/route-params.constants";
import { replaceUrlParams } from "utils/getUrlWithParams.util";

import { IRoleAdapter, userAdapter } from "./adapters/users.adapter";
import {
  IUpdateUser,
  IUser,
  IUserAttachOption,
} from "./interfaces/user.interface";
import {
  IRoleResponse,
  IRolesResponse,
  IUserResponse,
} from "./interfaces/user-response.interface";

// current user
export const getCurrentUser = async (): Promise<IUser> => {
  const api = await getAxiosInstance();
  const response = await api.get<IUserResponse>(USER_ME);
  return userAdapter(response.data);
};

export const initUser = async () // Login / Register
: Promise<IUser> => {
  const api = await getAxiosInstance();
  const response = await api.post<IUserResponse>(USER_INIT);
  return userAdapter(response.data);
};

// shopper/brand/boutique (attach role to user)
// https://api.unik.style/unik/v0/shared/docs#/operations/attach_role_to_user_unik_v0_users__user_id__roles_post
export const attachRoleToUser = async (id: string, data: any): Promise<any> => {
  const api = await getAxiosInstance();
  const response = await api.post<IUserResponse>(
    replaceUrlParams(ATTACH_ROLE_TO_USER, { [USER_ID_PARAM]: id }),

    data,

    {
      params: {
        user_id: id,
      },
    },
  );
  return userAdapter(response?.data);
};

// Selected preferences, write sth
// https://api.unik.style/unik/v0/shared/docs#/operations/attach_options_to_user_role_unik_v0_preferences_options_post
export const attachOptionsToUser = async (
  values: IUserAttachOption,
): Promise<IUser> => {
  const api = await getAxiosInstance();
  const response = await api.post<IUserResponse>(ATTACH_OPTIONS_TO_USER, {
    option_ids: values.categories,
    free_text: values.free_text,
  });
  return userAdapter(response?.data);
};

// Personal information (update user)
// https://api.unik.style/unik/v0/shared/docs#/operations/update_user_unik_v0_users__user_id__put
export const updateUser = async (
  id: string,
  data: IUpdateUser,
): Promise<IUser> => {
  const api = await getAxiosInstance();
  const response = await api.put<IUserResponse>(
    replaceUrlParams(UPDATE_USER, { [USER_ID_PARAM]: id }),
    data,
    {
      params: {
        user_id: id,
      },
    },
  );
  return userAdapter(response?.data);
};

// Get All Roles
// https://api.unik.style/unik/v0/shared/docs#/operations/get_roles_unik_v0_roles_get

export const getRoles = async (): Promise<IRoleResponse[]> => {
  const api = await getAxiosInstance();
  const response = await api.get<IRolesResponse>(GET_ROLES);
  return IRoleAdapter(response?.data.items);
};

// Record Asset
// https://api.unik.style/unik/v0/shared/docs#/operations/record_asset_unik_v0_assets_post
