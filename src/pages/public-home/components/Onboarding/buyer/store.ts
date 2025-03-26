import {
  AssetType,
  FileType,
  IRecordAsset,
} from "api/services/assets/interfaces/asset.interface";
import { create } from "zustand";

export interface BuyerRoleMultiStepModel {
  recordAssetBody: IRecordAsset;
  username: string;
  userAvatar: string;
  phoneNumber: string;
  checked: string[];
  categories: string[];
  writeDetail: string;
}

interface BuyerMultiStepFormState {
  stateData: BuyerRoleMultiStepModel;
  updateState: (newData: Partial<BuyerRoleMultiStepModel>) => void;
  resetState: () => void;
  updateUserAvatar: (avatar: string) => void;
}

const initialState = {
  username: "",
  userAvatar: "",
  phoneNumber: "",
  checked: [],
  categories: [],
  writeDetail: "",
  recordAssetBody: {
    asset_type: AssetType.AVATAR,
    file_type: FileType.PNG,
    related_id: "",
    url: "",
  },
};
export const useBuyerMultiStepFormStore = create<BuyerMultiStepFormState>(
  (set) => ({
    stateData: initialState,
    updateState: (newData) =>
      set((state) => ({ stateData: { ...state.stateData, ...newData } })),
    resetState: () =>
      set({
        stateData: initialState,
      }),
    updateUserAvatar: (avatar: string) =>
      set((state) => ({
        stateData: { ...state.stateData, userAvatar: avatar },
      })),
  }),
);
