import { IProfileSellerInfo } from "../interfaces/profile-seller-info.interface";
import { IProfileSellerInfoResponse } from "../interfaces/profile-seller-info-response.interface";

export const profileSellerInfoAdapter = (
  profileSellerInfoResponse: IProfileSellerInfoResponse,
): IProfileSellerInfo => {
  return profileSellerInfoResponse;
};
