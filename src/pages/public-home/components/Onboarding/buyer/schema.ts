import { isValidNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import * as Yup from "yup";
const stepOneSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  phoneNumber: Yup.string()
    .optional()
    .test("phoneNumber", "Invalid phone number", (value) => {
      if (!value) return false;
      const parsedNumber = parsePhoneNumberFromString(value);
      return parsedNumber && isValidNumber(value);
    }),
  checked: Yup.array().optional(),
});
const stepTwoSchema = Yup.object({
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "You must select at least 1 category")
    .max(15, "You can select up to 15 categories")
    .default([]),
});

export { stepOneSchema, stepTwoSchema };
