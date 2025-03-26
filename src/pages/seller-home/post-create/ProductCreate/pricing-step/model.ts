import { FormikProps } from "formik";
import * as yup from "yup";

const pricingSchemaObject = {
  // one of two: "variant-based" or "size-based" or "full-price"
  pricingType: yup
    .string()
    .required("Pricing type is required")
    .oneOf(["variant-based", "full-price"]),
  // price is an array that is mapped to the overview schema's otherVariants
  prices: yup
    .array()
    .min(1, "At least one price is required")
    .required("You are required to have a price."),
  // discount is a number
  discount: yup
    .number()
    .required("Discount is required")
    .min(0, "Discount must be greater than or equal to 0"),
  discountType: yup
    .string()
    .required("Discount type is required")
    .default("%")
    .oneOf(["$", "%"]),
};

const pricingSchema = yup.object().shape(pricingSchemaObject);

const pricingInitialValues = pricingSchema.cast({
  pricingType: "full-price",
  prices: [],
  discount: 0,
});

type PricingStepProps = {
  variants: string[];
  formik: PricingStepSchema;
};

type PricingStepSchema = FormikProps<typeof pricingInitialValues>;

export {
  pricingSchema,
  pricingInitialValues,
  PricingStepProps,
  pricingSchemaObject,
  PricingStepSchema,
};
