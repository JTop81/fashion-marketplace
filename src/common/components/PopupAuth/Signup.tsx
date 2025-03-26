import React from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Fieldset, Legend } from "@headlessui/react";
import { logo } from "assets";
import Divider from "common/components/Divider";
import Image from "common/components/Image";
import FieldInput from "common/components/Inputs/FieldInput/FieldInput";
import PrimaryButton, {
  SocialLoginButton,
} from "common/components/PrimaryButton";
import { ErrorMessage, Form, Formik } from "formik";
import { useAuthStore } from "setup/store/auth/authStore";

import { signupFormConfig } from "./schema";

export const SignupPopup = () => {
  const setAuthSection = useAuthStore((state) => state.setAuthSection);
  const error = useAuthStore((state) => state.error);
  const loginWithSocial = useAuthStore((state) => state.loginWithSocial);

  return (
    <>
      <div className="flex justify-center flex-col items-center gap-2 py-4">
        <Image src={logo} width="72" alt="logo" height="72" />
        <div className="font-Poppins font-medium text-[26px] lg:text-[2rem] leading-[3rem] text-center">
          Fashion&apos;s Future is UNIK
        </div>
        <div className="font-medium text-base text-customTextGray2 text-center">
          Sign up with
        </div>
        <div className="flex flex-row gap-4 lg:hidden">
          <SocialLoginButton
            icon={<FcGoogle className="w-[24px] h-[24px]" />}
            onClick={() => loginWithSocial("google-oauth2")}
          />
          <SocialLoginButton
            icon={
              <FaFacebook
                className="w-[24px] h-[24px]"
                color="dodgerblue"
                style={{ color: "dodgerblue" }}
                onClick={() => loginWithSocial("facebook")}
              />
            }
          />
          <SocialLoginButton
            icon={<FaApple className="w-[24px] h-[24px]" />}
            onClick={() => loginWithSocial("apple")}
          />
        </div>
        <div className="lg:flex flex-row gap-4 hidden">
          <SocialLoginButton
            icon={<FcGoogle className="w-[24px] h-[24px]" />}
            text="Google"
            onClick={() => loginWithSocial("google-oauth2")}
          />
          <SocialLoginButton
            icon={<FaFacebook className="w-[24px] h-[24px] text-blue" />}
            text="Facebook"
            onClick={() => loginWithSocial("facebook")}
          />
          <SocialLoginButton
            icon={<FaApple className="w-[24px] h-[24px]" />}
            text="Apple"
            onClick={() => loginWithSocial("apple")}
          />
        </div>
      </div>
      <Divider label="Or" />
      <Formik
        initialValues={signupFormConfig.initialValues}
        validationSchema={signupFormConfig.validationSchema}
        onSubmit={signupFormConfig.onSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className="w-full flex flex-col gap-6">
            <Fieldset className="flex flex-col gap-2 items-center">
              <Legend className="hidden">Signup Form</Legend>
              <FieldInput
                label="Email Address"
                placeholder="Enter your email address..."
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                isRequired={true}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
              <FieldInput
                label="Password"
                placeholder="********"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                icon
                isRequired={true}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              <FieldInput
                label="Confirm Password"
                placeholder="********"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                icon
                isRequired={true}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
            </Fieldset>
            {error && <div className="text-red-500">{error}</div>}
            <Fieldset className="flex flex-col gap-4 items-center">
              <Legend className="hidden">Signup Button</Legend>
              <PrimaryButton
                type="submit"
                text="Sign up"
                isFull
                disabled={isSubmitting}
              />
            </Fieldset>
            <Fieldset className="flex flex-col gap-4 items-center">
              <Legend className="hidden">Login Link</Legend>
              <div className="flex font-Poppins text-customBgGray text-md text-center gap-2">
                have an account?
                <span
                  className="text-customTextPink2 underline cursor-pointer"
                  onClick={() => setAuthSection("login")}
                >
                  Log in
                </span>
              </div>
            </Fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupPopup;
