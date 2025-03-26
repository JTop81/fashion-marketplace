import {
  AssetType,
  FileType,
  IRecordAsset,
} from "api/services/assets/interfaces/asset.interface";
import { create } from "zustand";

export interface BrandBoutiqueRoleMultiStepModel {
  recordAssetBody: IRecordAsset;
  username: string;
  phoneNumber: string;
  country: string;
  zipcode: string;
  state: string;
  address1: string;
  address2: string;
  checked: string[];
  brandAvatar: string;
  name: string;
  bio: string;
  url: string;
  categories: string[];
  free_text: string;
  websites: string[];
}

interface BrandBoutiqueMultiStepFormState {
  stateData: BrandBoutiqueRoleMultiStepModel;
  updateState: (newData: Partial<BrandBoutiqueRoleMultiStepModel>) => void;
  resetState: () => void;
  updateBrandLogo: (avatar: string) => void;
}

const initialState = {
  username: "",
  phoneNumber: "",
  country: "",
  zipcode: "",
  state: "",
  address1: "",
  address2: "",
  checked: [],
  brandAvatar: "",
  name: "",
  bio: "",
  url: "",
  categories: [],
  free_text: "",
  websites: [],
  recordAssetBody: {
    asset_type: AssetType.AVATAR,
    file_type: FileType.PNG,
    related_id: "",
    url: "",
  },
};
export const useBrandBoutiqueMultiStepFormStore =
  create<BrandBoutiqueMultiStepFormState>((set) => ({
    stateData: initialState,
    updateState: (newData) =>
      set((state) => ({ stateData: { ...state.stateData, ...newData } })),
    resetState: () =>
      set({
        stateData: initialState,
      }),
    updateBrandLogo: (avatar: string) =>
      set((state) => ({
        stateData: { ...state.stateData, brandAvatar: avatar },
      })),
  }));
