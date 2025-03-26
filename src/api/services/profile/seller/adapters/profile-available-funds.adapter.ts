import { IProfileAvailableFunds } from "../interfaces/profile-available-funds.interface";
import { IProfileAvailableFundsResponse } from "../interfaces/profile-available-funds-response.interface";

export const profileAvailableFundsAdapter = (
  profileEarningResponse: IProfileAvailableFundsResponse,
): IProfileAvailableFunds => {
  return profileEarningResponse;
};
