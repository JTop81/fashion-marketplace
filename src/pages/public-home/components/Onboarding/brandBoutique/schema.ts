import { isValidNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import * as Yup from "yup";

const stepOneSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  country: Yup.string().required("Country is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .test("is-valid-phone", "Invalid phone number", (value) => {
      if (!value) return false;
      const parsedNumber = parsePhoneNumberFromString(value);
      return parsedNumber && isValidNumber(value);
    }),
  zipcode: Yup.number().required("Zipcode is required"),
  state: Yup.string().required("State is required"),
  address1: Yup.string().required("Address is required"),
  address2: Yup.string().optional(),
});

const stepTwoSchema = Yup.object({
  name: Yup.string().required("Brand Name is required"),
  bio: Yup.string().optional(),
});

const stepThreeSchema = Yup.object({
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "You must select at least 1 category")
    .max(15, "You can select up to 15 categories")
    .default([]),
});
const fieldsPerStepBrandAndBoutique: any = {
  1: [
    "username",
    "country",
    "zipcode",
    "state",
    "address1",
    "address2",
    "phoneNumber",
  ],
  2: ["name", "bio", "websites"],
  3: ["categories"],
  4: ["free_text"],
};
const fieldsPerStepShopper: any = {
  1: ["username", "phoneNumber", "avatar_id"],
  2: ["categories"],
  3: ["free_text"],
};
export {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  fieldsPerStepBrandAndBoutique,
  fieldsPerStepShopper,
};
