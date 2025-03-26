import { FormikProps } from "formik";
import * as yup from "yup";

const descriptionSchemaObject = {
  description: yup.string().required("Description is required"),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, "At least one tag is required")
    .required("Tags are required"),
};

const descriptionSchema = yup.object().shape(descriptionSchemaObject);

const descriptionInitialValues = descriptionSchema.cast({
  description: "",
  tags: [],
});

type DescriptionStepValues = typeof descriptionInitialValues;
type DescriptionStepProps = FormikProps<DescriptionStepValues>;

export {
  descriptionSchema,
  descriptionInitialValues,
  descriptionSchemaObject,
  DescriptionStepProps,
};
