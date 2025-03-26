import { isValidNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import * as Yup from "yup";
const validationSchemaBrandInfo = Yup.object().shape({
  name: Yup.string().required("Brand Name is required"),
  bio: Yup.string().required("Bio is required"),
  address1: Yup.string().required("Address1 is required"),
  address2: Yup.string().required("Address2 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

const validationSchemaSellerInfo = Yup.object().shape({
  username: Yup.string().required("Full Name is required"),
  email: Yup.string().required("Email is required"),
  phoneNumber: Yup.string()
    .optional()
    .test("phoneNumber", "Invalid phone number", (value) => {
      if (!value) return false;
      const parsedNumber = parsePhoneNumberFromString(value);
      return parsedNumber && isValidNumber(value);
    }),
});

export { validationSchemaBrandInfo, validationSchemaSellerInfo };
