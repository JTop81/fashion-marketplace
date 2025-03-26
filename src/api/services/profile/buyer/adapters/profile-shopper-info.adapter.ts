import { IProfileShopperInfo } from "../interfaces/profile-shopper-info.interface";
import { IProfileShopperInfoResponse } from "../interfaces/profile-shopper-info-response.interface";

export const profileShopperInfoAdapter = (
  profileShopperInfoResponse: IProfileShopperInfoResponse,
): IProfileShopperInfo => {
  return profileShopperInfoResponse;
};
