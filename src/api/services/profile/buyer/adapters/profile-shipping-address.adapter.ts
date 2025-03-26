import { IProfileShippingAddress } from "../interfaces/profile-shipping-address.interface";
import { IProfileShippingAddressResponse } from "../interfaces/profile-shipping-address-response.interface";

export const profileShippingAddressAdapter = (
  profileShippingAddressResponse: IProfileShippingAddressResponse,
): IProfileShippingAddress => {
  return profileShippingAddressResponse;
};
