import { IProfileContactInfo } from "../interfaces/profile-contact-info.interface";
import { IProfileContactInfoResponse } from "../interfaces/profile-contact-info-response.interface";

export const profileContactInfoAdapter = (
  profileContactInfoResponse: IProfileContactInfoResponse,
): IProfileContactInfo => {
  return profileContactInfoResponse;
};
