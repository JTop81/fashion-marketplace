import { toast } from "react-toastify";
import { getAxiosInstance } from "api/axios";
import { UPDATE_USER_INFO } from "api/constants/endpoints.constants";
import { USER_ROLE_ID } from "api/constants/route-params.constants";
import { IAsset } from "api/services/assets/interfaces/asset.interface";
import {
  getProfileContactInfo,
  getProfileShippingAddress,
  getProfileShopperInfo,
} from "api/services/profile/buyer";
import { IProfileContactInfo } from "api/services/profile/buyer/interfaces/profile-contact-info.interface";
import { IProfileShippingAddress } from "api/services/profile/buyer/interfaces/profile-shipping-address.interface";
import { IProfileShopperInfo } from "api/services/profile/buyer/interfaces/profile-shopper-info.interface";
import { updateUser } from "api/services/users";
import { userAdapter } from "api/services/users/adapters/users.adapter";
import { IUser } from "api/services/users/interfaces/user.interface";
import axios from "axios";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";
import { replaceUrlParams } from "utils/getUrlWithParams.util";
import { transformError } from "utils/transformError";
import { create } from "zustand";

import { HeaderTabType } from "pages/buyer-home/profile/components/ProfileHeader/types";

type BuyerProfileInfoStore = {
  tab: HeaderTabType;
  shopperInfo: IProfileShopperInfo;
  contactInfo: IProfileContactInfo;
  shippingAddress: IProfileShippingAddress;
  setShopperShopperAvatar: (avatar: string, res: IAsset) => void;
  setShopperInfo: (
    updateInfo: IProfileShopperInfo,
    id: string | undefined,
  ) => void;
  setContactInfo: (updateInfo: IProfileContactInfo) => void;
  setShippingAddress: (updateInfo: IProfileShippingAddress) => void;
  fetchShopperInfo: () => Promise<void>;
  fetchContactInfo: () => Promise<void>;
  fetchShippingAddress: () => Promise<void>;
  initialProfileInfoFromAuth: (user: IUser) => void;
  setTab: (newTab: HeaderTabType) => void;
  isShopperInfoModalOpen: boolean;
  setIsShopperInfoModalOpen: (isShopperInfoModalOpen: boolean) => void;
  setIsShippingAddressModalOpen: (isShippingAddressModalOpen: boolean) => void;
  isShippingAddressModalOpen: boolean;
  setIsBuyerContactInfoModalOpen: (
    isBuyerContactInfoModalOpen: boolean,
  ) => void;
  isBuyerContactInfoModalOpen: boolean;
};

const useBuyerProfileInfoStore = create<BuyerProfileInfoStore>((set) => ({
  tab: HeaderTabType.settings,
  shopperInfo: {
    username: "",
    shopperAvatar: "",
    phoneNumber: "",
  },
  contactInfo: {
    email: "",
  },
  shippingAddress: {
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  },
  isShopperInfoModalOpen: false,
  isShippingAddressModalOpen: false,
  isBuyerContactInfoModalOpen: false,

  setIsShopperInfoModalOpen: (isShopperInfoModalOpen) =>
    set({ isShopperInfoModalOpen }),
  setIsShippingAddressModalOpen: (isShippingAddressModalOpen) =>
    set({ isShippingAddressModalOpen }),
  setIsBuyerContactInfoModalOpen: (isBuyerContactInfoModalOpen) =>
    set({ isBuyerContactInfoModalOpen }),

  setTab: (newTab) => set({ tab: newTab }),
  setShopperShopperAvatar: (avatar: string, res: IAsset) => {
    // Update the `useAuthStore` state
    useAuthStore.setState((state) => {
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          avatar: res,
        },
      };
    });

    // Update the current store's state
    set((state) => ({
      shopperInfo: {
        ...state.shopperInfo,
        shopperAvatar: avatar,
      },
    }));
  },
  setShopperInfo: async (
    updateInfo: IProfileShopperInfo,
    id: string | undefined,
  ) => {
    set({ shopperInfo: updateInfo });
    const updateUserInfo = useAuthStore.getState().user;
    const data = {
      username: updateInfo.username,
      phone: updateInfo.phoneNumber,
      avatar_id: updateUserInfo?.avatar?.id || null,
      status: "ACTIVE",
    };
    await updateUser(updateUserInfo?.id ?? "", data)
      .then(async () => {
        useAuthStore.setState((state) => {
          if (!state.user) return state;
          return {
            ...state,
            user: {
              ...state.user,
              username: updateInfo.username,
              phone: updateInfo.phoneNumber,
            },
          };
        });
        const sendData = {
          type: Role.SHOPPER,
          geo_location_enabled: true,
          notifications_enabled: true,
        };
        // Call API
        const api = await getAxiosInstance();
        await api
          .put<any>(
            replaceUrlParams(UPDATE_USER_INFO, { [USER_ROLE_ID]: id || "" }),
            sendData,
          )
          .then((response) => {
            set({ isShopperInfoModalOpen: false });
            return userAdapter(response?.data);
          });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          set({ isShopperInfoModalOpen: true });
          const userFriendlyMessage = transformError(error.response);
          toast.error(userFriendlyMessage);
        }
      });
  },
  setContactInfo: (updateInfo: IProfileContactInfo) => {
    set({ contactInfo: updateInfo });
  },
  setShippingAddress: (updateInfo: IProfileShippingAddress) => {
    set({ shippingAddress: updateInfo });
  },
  fetchShopperInfo: async () => {
    const shopperInfo = await getProfileShopperInfo();
    set((state) => ({
      shopperInfo: {
        ...shopperInfo,
        shopperAvatar:
          shopperInfo.shopperAvatar || state.shopperInfo.shopperAvatar,
      },
    }));
  },
  fetchContactInfo: async () => {
    const contactInfo = await getProfileContactInfo();
    set({ contactInfo });
  },
  fetchShippingAddress: async () => {
    const shippingAddress = await getProfileShippingAddress();
    set({ shippingAddress });
  },
  initialProfileInfoFromAuth: (user: IUser) => {
    set({
      shopperInfo: {
        shopperAvatar: user?.avatar?.url || "",
        username: user.username || "",
        phoneNumber: user.phone,
      },
      contactInfo: {
        email: user.email,
      },
      shippingAddress: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
      },
    });
  },
}));
export { useBuyerProfileInfoStore };
