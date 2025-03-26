import { IProfilePreferences } from "../interfaces/profile-preferences.interface";
import { IProfilePreferencesResponse } from "../interfaces/profile-preferences-response.interface";

export const profilePreferencesAdapter = (
  profilePreferencesResponse: IProfilePreferencesResponse,
): IProfilePreferences => {
  return profilePreferencesResponse;
};
