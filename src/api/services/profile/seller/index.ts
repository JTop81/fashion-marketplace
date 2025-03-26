import { getAxiosInstance } from "api/axios";
import {
  GET_USER_OPTIONS,
  SELLER_PROFILE_AVAILABLE_FUNDS_URL,
  SELLER_PROFILE_BRANDINFO_URL,
  SELLER_PROFILE_CATEGORIES_URL,
  SELLER_PROFILE_EARNING_URL,
  SELLER_PROFILE_SELLERINFO_URL,
  UPDATE_USER_ROLE_OPTIONS,
} from "api/constants/endpoints.constants";
import { PREFERENCE_ID } from "api/constants/route-params.constants";
import {
  IUpdateUserRoleOptions,
  IUpdateUserRoleOptionsResponse,
} from "api/services/customize/interfaces/categories.interface";
import axios from "axios";
import { replaceUrlParams } from "utils/getUrlWithParams.util";

import { profileAvailableFundsAdapter } from "./adapters/profile-available-funds.adapter";
import { profileBrandInfoAdapter } from "./adapters/profile-brand-info.adapter";
import { profileEarningAdapter } from "./adapters/profile-earning.adapter";
import { profileSellerCategoriesAdapter } from "./adapters/profile-seller-categories.adapter";
import { profileSellerInfoAdapter } from "./adapters/profile-seller-info.adapter";
import { IProfileAvailableFunds } from "./interfaces/profile-available-funds.interface";
import { IProfileAvailableFundsResponse } from "./interfaces/profile-available-funds-response.interface";
import { IProfileBrandInfo } from "./interfaces/profile-brand-info.interface";
import { IProfileBrandInfoResponse } from "./interfaces/profile-brand-info-response.interface";
import { IProfileEarning } from "./interfaces/profile-earning.interface";
import { IProfileEarningResponse } from "./interfaces/profile-earning-response.interface";
import { IProfileSellerCategoriesResponse } from "./interfaces/profile-seller-categories.interface";
import { IProfileSellerInfo } from "./interfaces/profile-seller-info.interface";
import { IProfileSellerInfoResponse } from "./interfaces/profile-seller-info-response.interface";

interface Filter {
  [key: string]: {
    eq: string;
  };
}
export const getProfileEarning = async (): Promise<IProfileEarning> => {
  const response = await axios.get<IProfileEarningResponse>(
    SELLER_PROFILE_EARNING_URL,
  );

  return profileEarningAdapter(response.data);
};

export const getProfileAvailableFunds =
  async (): Promise<IProfileAvailableFunds> => {
    const response = await axios.get<IProfileAvailableFundsResponse>(
      SELLER_PROFILE_AVAILABLE_FUNDS_URL,
    );

    return profileAvailableFundsAdapter(response.data);
  };

export const getProfileBrandInfo = async (): Promise<IProfileBrandInfo> => {
  const response = await axios.get<IProfileBrandInfoResponse>(
    SELLER_PROFILE_BRANDINFO_URL,
  );

  return profileBrandInfoAdapter(response.data);
};

export const getProfileSellerInfo = async (): Promise<IProfileSellerInfo> => {
  const response = await axios.get<IProfileSellerInfoResponse>(
    SELLER_PROFILE_SELLERINFO_URL,
  );

  return profileSellerInfoAdapter(response.data);
};

export const getProfileSellerCategories =
  async (): Promise<IProfileSellerCategoriesResponse> => {
    const response = await axios.get<IProfileSellerCategoriesResponse>(
      SELLER_PROFILE_CATEGORIES_URL,
    );

    return profileSellerCategoriesAdapter(response.data);
  };

// real endpoint for preferences
export const updateUserRoleOptions = async (
  id: string,
  payload: { option_ids?: string[]; free_text?: string },
): Promise<IUpdateUserRoleOptions> => {
  const api = await getAxiosInstance();
  const response = await api.put<IUpdateUserRoleOptions>(
    replaceUrlParams(UPDATE_USER_ROLE_OPTIONS, { [PREFERENCE_ID]: id }),
    payload,
  );
  return response.data;
};

export const getUserOptions = async (
  id: string,
  preferenceId: string,
): Promise<any> => {
  const api = await getAxiosInstance();
  const filter: Filter = {
    user_role_id: {
      eq: id,
    },
    "option.preference_id": {
      eq: preferenceId,
    },
  };
  const response = await api.get<IUpdateUserRoleOptionsResponse>(
    GET_USER_OPTIONS,
    {
      params: {
        filter: JSON.stringify(filter),
        limit: JSON.stringify(50),
      },
    },
  );
  return response.data.items;
};
