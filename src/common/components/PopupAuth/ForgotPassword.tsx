import React from "react";
import { Fieldset, Legend } from "@headlessui/react";
import { logo } from "assets";
import Image from "common/components/Image";
import FieldInput from "common/components/Inputs/FieldInput/FieldInput";
import PrimaryButton from "common/components/PrimaryButton";
import { ErrorMessage, Form, Formik } from "formik";
import { useAuthStore } from "setup/store/auth/authStore";

import { forgotPasswordFormConfig } from "./schema";

export default function ForgotPasswordPopup() {
  const { setAuthSection } = useAuthStore();

  return (
    <>
      <div className="flex justify-center flex-col items-center gap-4 py-4 hidden lg:flex">
        <Image src={logo} width="72" alt="logo" height="72" />
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="font-Poppins font-medium text-[2rem] leading-[3rem] text-center cursor-pointer">
            Forgot Password?
          </div>
        </div>
        <Formik
          initialValues={forgotPasswordFormConfig.initialValues}
          validationSchema={forgotPasswordFormConfig.validationSchema}
          onSubmit={forgotPasswordFormConfig.onSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className="flex w-full flex-col justify-center items-center gap-8">
              <Fieldset className="flex w-full flex-col justify-center items-center gap-8">
                <Legend className="hidden">Forgot Password Form</Legend>
                <FieldInput
                  label="Email Address"
                  placeholder="Enter your email address..."
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </Fieldset>
              <Fieldset className="flex flex-col gap-8 items-center">
                <Legend className="hidden">Submit Button</Legend>
                <PrimaryButton
                  type="submit"
                  text="Send reset link"
                  isFull
                  disabled={isSubmitting}
                />
                <button
                  onClick={() => setAuthSection("login")}
                  type="button"
                  className="text-black/50 text-md underline"
                >
                  Cancel
                </button>
              </Fieldset>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
