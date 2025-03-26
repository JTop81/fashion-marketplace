import {
  BUYER_PROFILE_CATEGORY_LIST,
  BUYER_PROFILE_CONTACT_INFO,
  BUYER_PROFILE_PREFERENCES,
  BUYER_PROFILE_SHIPPING_ADDRESS,
  BUYER_PROFILE_SHOPPER_INFO,
} from "api/constants/endpoints.constants";
import axios from "axios";

import { profileCategoryListAdapter } from "./adapters/profile-category-list.adapter";
import { profileContactInfoAdapter } from "./adapters/profile-contact-info.adapter";
import { profilePreferencesAdapter } from "./adapters/profile-preferences.adapter";
import { profileShippingAddressAdapter } from "./adapters/profile-shipping-address.adapter";
import { profileShopperInfoAdapter } from "./adapters/profile-shopper-info.adapter";
import { IProfileCategoryList } from "./interfaces/profile-category-list";
import { IProfileCategoryListResponse } from "./interfaces/profile-category-list-response";
import { IProfileContactInfo } from "./interfaces/profile-contact-info.interface";
import { IProfileContactInfoResponse } from "./interfaces/profile-contact-info-response.interface";
import { IProfilePreferences } from "./interfaces/profile-preferences.interface";
import { IProfilePreferencesResponse } from "./interfaces/profile-preferences-response.interface";
import { IProfileShippingAddress } from "./interfaces/profile-shipping-address.interface";
import { IProfileShippingAddressResponse } from "./interfaces/profile-shipping-address-response.interface";
import { IProfileShopperInfo } from "./interfaces/profile-shopper-info.interface";
import { IProfileShopperInfoResponse } from "./interfaces/profile-shopper-info-response.interface";

export const getProfilePreferences = async (): Promise<IProfilePreferences> => {
  const response = await axios.get<IProfilePreferencesResponse>(
    BUYER_PROFILE_PREFERENCES,
  );

  return profilePreferencesAdapter(response.data);
};

export const getProfileShopperInfo = async (): Promise<IProfileShopperInfo> => {
  const response = await axios.get<IProfileShopperInfoResponse>(
    BUYER_PROFILE_SHOPPER_INFO,
  );

  return profileShopperInfoAdapter(response.data);
};

export const getProfileContactInfo = async (): Promise<IProfileContactInfo> => {
  const response = await axios.get<IProfileContactInfoResponse>(
    BUYER_PROFILE_CONTACT_INFO,
  );

  return profileContactInfoAdapter(response.data);
};

export const getProfileShippingAddress =
  async (): Promise<IProfileShippingAddress> => {
    const response = await axios.get<IProfileShippingAddressResponse>(
      BUYER_PROFILE_SHIPPING_ADDRESS,
    );

    return profileShippingAddressAdapter(response.data);
  };

export const getProfileCategoryList =
  async (): Promise<IProfileCategoryList> => {
    const response = await axios.get<IProfileCategoryListResponse>(
      BUYER_PROFILE_CATEGORY_LIST,
    );

    return profileCategoryListAdapter(response.data);
  };
