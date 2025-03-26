import { IProfileEarning } from "../interfaces/profile-earning.interface";
import { IProfileEarningResponse } from "../interfaces/profile-earning-response.interface";

export const profileEarningAdapter = (
  profileEarningResponse: IProfileEarningResponse,
): IProfileEarning => {
  const { earning, spending } = profileEarningResponse;

  return { earning, spending };
};
