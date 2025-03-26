// formConfigs/loginFormConfig.ts

import { useAuthStore } from "setup/store/auth/authStore";
import * as Yup from "yup";

const loginWithPopup = useAuthStore.getState().loginWithPopup;

export const loginFormConfig = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  }),
  fields: [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ],
  onSubmit: async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    await loginWithPopup(values.email, values.password);
    setSubmitting(false);
  },
};

const signupWithEmail = useAuthStore.getState().signupWithEmail;

export const signupFormConfig = {
  initialValues: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
  }),
  fields: [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ],
  onSubmit: async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    await signupWithEmail(values.email, values.password);
    setSubmitting(false);
  },
};

const forgotPassword = useAuthStore.getState().forgotPassword;

export const forgotPasswordFormConfig = {
  initialValues: {
    email: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  }),
  onSubmit: async (
    values: { email: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    await forgotPassword(values.email);
    setSubmitting(false);
  },
};
