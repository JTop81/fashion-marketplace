import { FormikProps } from "formik";
import * as yup from "yup";

import { Variant } from "../Components/VariantManager";

export interface OverviewStepValues {
  previews: Array<{ name: string; content: string }>;
  productName: string;
  categories: string[];
  variants: Variant[];
  sizeType?: string;
  sizes?: string[];
}

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
  productName: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be at most 150 characters")
    .required("Title is required"),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, "At least one category is required")
    .required("Categories are required"),
  variants: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Variant name is required"),
        description: yup.string().required("Variant description is required"),
      }),
    )
    .min(1, "You must have at least one variant."),
  sizeType: yup.string().optional(),
  sizes: yup.array().of(yup.string()).optional(),
};

const overviewSchema = yup.object().shape(overviewSchemaObject);

const overviewInitialValues: OverviewStepValues = {
  previews: [],
  productName: "",
  categories: [],
  variants: [],
};

type OverviewStepProps = FormikProps<OverviewStepValues>;

export {
  overviewSchema,
  overviewInitialValues,
  overviewSchemaObject,
  OverviewStepProps,
};
