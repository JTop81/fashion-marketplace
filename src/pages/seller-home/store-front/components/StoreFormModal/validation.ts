import * as yup from "yup";

export const storeFormSchema = yup.object().shape({
  storeName: yup
    .string()
    .required("Store name is required")
    .min(2, "Store name must be at least 2 characters")
    .max(50, "Store name must be less than 50 characters"),

  storeDescription: yup
    .string()
    .required("Store description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),

  storeAddress: yup
    .string()
    .required("Store address is required")
    .min(5, "Address must be at least 5 characters"),

  selectedCategories: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        option_value: yup.string().required(),
        imgUrl: yup.string().nullable(),
        preference_id: yup.string().required(),
      }),
    )
    .min(1, "Please select at least one category"),

  storeWebsites: yup.array().of(
    yup
      .string()
      .url("Please enter a valid URL")
      .matches(/^https?:\/\/.+/, "URL must start with http:// or https://"),
  ),
});

export type StoreFormValidation = yup.InferType<typeof storeFormSchema>;
