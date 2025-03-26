import { FormikProps } from "formik";
import * as yup from "yup";

const overviewSchemaObject = {
  previews: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        content: yup.string().required(),
      }),
    )
    .min(1, "At least one preview is required")
    .required(),
  externalName: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, "At least one category is required")
    .required("Categories are required"),
  platformType: yup
    .string()
    .required("Platform type is required")
    .oneOf(["shopify", "etsy"]),
  link: yup.string().required("Link is required"),
  variants: yup.array().of(yup.string()).optional(),
};

const overviewSchema = yup.object().shape(overviewSchemaObject);

const overviewInitialValues = overviewSchema.cast({
  previews: [],
  externalName: "",
  categories: [],
  platformType: "shopify",
  link: "",
  variants: [],
});

type OverviewStepValues = typeof overviewInitialValues;
type OverviewStepProps = FormikProps<OverviewStepValues>;

export {
  overviewSchema,
  overviewInitialValues,
  overviewSchemaObject,
  OverviewStepProps,
};
