import { CONTACTS_URL } from "api/constants/endpoints.constants";
import axios from "axios";

import { contactAdapter } from "./adapters/contacts.adapter";
import { IContactResponse } from "./interfaces/contact-response.interface";

export const getContacts = async () => {
  const response = await axios.get<IContactResponse[]>(CONTACTS_URL);

  return response.data.map(contactAdapter);
};
