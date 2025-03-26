import { IContact } from "../interfaces/contact.interface";
import { IContactResponse } from "../interfaces/contact-response.interface";

export const contactAdapter = (contactResponse: IContactResponse): IContact => {
  return contactResponse;
};
