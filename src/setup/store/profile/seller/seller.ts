import { toast } from "react-toastify";
import { getAxiosInstance } from "api/axios";
import { UPDATE_USER_INFO } from "api/constants/endpoints.constants";
import { USER_ROLE_ID } from "api/constants/route-params.constants";
import { IAsset } from "api/services/assets/interfaces/asset.interface";
import { IBoutiqueDetails } from "api/services/posts/interfaces/post-response.interface";
import { IProfileBrandInfo } from "api/services/profile/seller/interfaces/profile-brand-info.interface";
import { IProfileSellerInfo } from "api/services/profile/seller/interfaces/profile-seller-info.interface";
import { updateUser } from "api/services/users";
import { userAdapter } from "api/services/users/adapters/users.adapter";
import { IUser } from "api/services/users/interfaces/user.interface";
import axios from "axios";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";
import { replaceUrlParams } from "utils/getUrlWithParams.util";
import { transformError } from "utils/transformError";
import { create } from "zustand";

import { HeaderTabType } from "pages/seller-home/profile/components/ProfileHeader";

type SellerProfileInfoStore = {
  brandInfo: IProfileBrandInfo;
  sellerInfo: IProfileSellerInfo;
  tab: HeaderTabType;
  setTab: (tab: HeaderTabType) => void;
  setBrandLogo: (logo: string, res: IAsset) => void;
  setBrandInfo: (updateInfo: IProfileBrandInfo, id: string | undefined) => void;
  setSellerInfo: (updateInfo: IProfileSellerInfo) => void;
  initialProfileInfoFromAuth: (user: IUser) => void;
  isBrandModalOpen: boolean;
  setIsBrandModalOpen: (isBrandModalOpen: boolean) => void;
  isSellerInfoModalOpen: boolean;
  setIsSellerInfoModalOpen: (isSellerInfoModalOpen: boolean) => void;
};

const useSellerProfileInfoStore = create<SellerProfileInfoStore>((set) => ({
  brandInfo: {
    brandLogo: "",
    name: "",
    bio: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
  },
  sellerInfo: {
    username: "",
    email: "",
    phoneNumber: "",
  },
  tab: HeaderTabType.settings,
  setTab: (tab) => set({ tab }),
  isBrandModalOpen: false,
  isSellerInfoModalOpen: false,
  setIsBrandModalOpen: (isBrandModalOpen) => set({ isBrandModalOpen }),
  setIsSellerInfoModalOpen: (isSellerInfoModalOpen) =>
    set({ isSellerInfoModalOpen }),
  setBrandLogo: (logo: string, res: IAsset) => {
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
      brandInfo: {
        ...state.brandInfo,
        brandLogo: logo,
      },
    }));
  },
  setBrandInfo: async (
    updateInfo: IProfileBrandInfo,
    id: string | undefined,
  ) => {
    set({ brandInfo: updateInfo });
    // Update localStorage
    useAuthStore.setState((state) => {
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          user_role: {
            ...state.user.user_role,
            details: {
              ...state.user.user_role.details,
              ...updateInfo,
              address1: updateInfo.address1,
              address2: updateInfo.address2,
            },
          },
        },
      };
    });
    // get user information localStorage
    const updateUserInfo = useAuthStore.getState().user;

    const sendData = {
      type: Role.BOUTIQUE,
      name: (updateUserInfo?.user_role?.details as IBoutiqueDetails).name,
      websites: (updateUserInfo?.user_role?.details as IBoutiqueDetails)
        ?.websites,
      address1: (updateUserInfo?.user_role?.details as IBoutiqueDetails)
        ?.address1,
      address2: (updateUserInfo?.user_role?.details as IBoutiqueDetails)
        ?.address2,
      city: (updateUserInfo?.user_role?.details as IBoutiqueDetails)?.city,
      state: (updateUserInfo?.user_role?.details as IBoutiqueDetails)?.state,
      country: (updateUserInfo?.user_role?.details as IBoutiqueDetails)
        ?.country,
      zipcode: (updateUserInfo?.user_role?.details as IBoutiqueDetails)
        ?.zipcode,
      bio: updateInfo.bio,
    };

    // Call API
    const api = await getAxiosInstance();
    const response = await api.put<any>(
      replaceUrlParams(UPDATE_USER_INFO, { [USER_ROLE_ID]: id || "" }),
      sendData,
    );
    return userAdapter(response?.data);
  },
  setSellerInfo: async (updateInfo: IProfileSellerInfo) => {
    set({ sellerInfo: updateInfo });
    const updateUserInfo = useAuthStore.getState().user;
    const data = {
      username: updateInfo.username,
      phone: updateInfo.phoneNumber,
      avatar_id: updateUserInfo?.avatar?.id || null,
      status: "ACTIVE",
    };
    await updateUser(updateUserInfo?.id ?? "", data)
      .then(async () => {
        // Update localStorage
        useAuthStore.setState((state) => {
          if (!state.user) {
            return state;
          }
          return {
            ...state,
            user: {
              ...state.user,
              username: updateInfo.username,
              phone: updateInfo.phoneNumber,
              user_role: {
                ...state.user.user_role,
                details: {
                  ...state.user.user_role.details,
                },
              },
            },
          };
        });
        set({ isSellerInfoModalOpen: false });
        // get user information localStorage
      })
      .catch((error) => {
        set({ isSellerInfoModalOpen: true });
        if (axios.isAxiosError(error)) {
          const userFriendlyMessage = transformError(error.response);
          toast.error(userFriendlyMessage);
        }
      });
  },
  initialProfileInfoFromAuth: (user: IUser) => {
    set({
      brandInfo: {
        brandLogo: user?.avatar?.url || "",
        name: (user?.user_role?.details as IBoutiqueDetails)?.name || "",
        bio: (user?.user_role?.details as IBoutiqueDetails)?.bio || "",
        address1:
          (user?.user_role?.details as IBoutiqueDetails)?.address1 || "",
        address2:
          (user?.user_role?.details as IBoutiqueDetails)?.address2 || "",
        city: (user?.user_role.details as IBoutiqueDetails)?.city || "",
        country: (user?.user_role.details as IBoutiqueDetails)?.country || "",
        state: (user?.user_role.details as IBoutiqueDetails)?.state || "",
      },
      sellerInfo: {
        username: user?.username || "",
        email: user?.email || "",
        phoneNumber: user?.phone || "",
      },
    });
  },
}));

export { useSellerProfileInfoStore };
