import { FormikProps } from "formik";

export interface MultiValueSearchBarProps {
  placeholder: string;
  formik: FormikProps<any>; // Replace 'any' with your form values interface
  updateState?: (newData: any) => void;
}
