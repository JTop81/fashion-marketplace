import { FormikProps } from "formik";
import * as yup from "yup";

import {
  pricingInitialValues,
  pricingSchemaObject,
} from "../../ProductCreate/pricing-step/model";
import {
  descriptionInitialValues,
  descriptionSchemaObject,
} from "../description-step/model";
import {
  overviewInitialValues,
  overviewSchemaObject,
} from "../overview-step/model";

const confirmSchemaObject = {
  ...overviewSchemaObject,
  ...descriptionSchemaObject,
  ...pricingSchemaObject,
};

const confirmSchema = yup.object().shape(confirmSchemaObject);

const confirmInitialValues = confirmSchema.cast({
  ...overviewInitialValues,
  ...descriptionInitialValues,
  ...pricingInitialValues,
});

type ConfirmStepValues = typeof overviewInitialValues &
  typeof descriptionInitialValues &
  typeof pricingInitialValues;

type ConfirmStepSchema = FormikProps<ConfirmStepValues>;

type ConfirmStepProps = {
  values: ConfirmStepValues;
  formik: ConfirmStepSchema;
};

export { confirmInitialValues, ConfirmStepProps, ConfirmStepValues };
