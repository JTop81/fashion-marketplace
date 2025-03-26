import { isValidNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import * as Yup from "yup";
const validationSchemaShopperInfo = Yup.object().shape({
  username: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .test("is-valid-phone", "Invalid phone number", (value) => {
      if (!value) return false;
      const parsedNumber = parsePhoneNumberFromString(value);
      return parsedNumber && isValidNumber(value);
    }),
});

const validationSchemaContactInfo = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
});

const validationSchemaShippingAddress = Yup.object().shape({
  shippingAddress: Yup.string().required("Shipping Address is required"),
});

export {
  validationSchemaShopperInfo,
  validationSchemaContactInfo,
  validationSchemaShippingAddress,
};
