import { isValidNumber, parsePhoneNumberFromString } from "libphonenumber-js";

export default function formatPhoneNumber(phoneNumber: string | undefined): {
  msg: string;
  status: boolean;
} {
  if (!phoneNumber) {
    return { msg: "Phone number is empty.", status: false };
  }
  const parsedNumber = parsePhoneNumberFromString(phoneNumber);
  try {
    if (!parsedNumber || !isValidNumber(phoneNumber)) {
      return { msg: "Invalid phone number", status: false };
    }
    return { msg: "Changes saved successfully", status: true };
  } catch (error) {
    return { msg: "Error formatting phone number", status: false };
  }
}
