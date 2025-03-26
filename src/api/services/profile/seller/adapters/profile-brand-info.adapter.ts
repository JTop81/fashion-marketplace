import { IProfileBrandInfo } from "../interfaces/profile-brand-info.interface";
import { IProfileBrandInfoResponse } from "../interfaces/profile-brand-info-response.interface";

export const profileBrandInfoAdapter = (
  profileBrandInfoResponse: IProfileBrandInfoResponse,
): IProfileBrandInfo => {
  return profileBrandInfoResponse;
};
