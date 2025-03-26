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

import { loginFormConfig } from "./schema";

export default function LoginPopup() {
  const setAuthSection = useAuthStore((state) => state.setAuthSection);
  const loading = useAuthStore((state) => state.isLoading);
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
          Log in with
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
        initialValues={loginFormConfig.initialValues}
        validationSchema={loginFormConfig.validationSchema}
        onSubmit={loginFormConfig.onSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className="w-full flex flex-col gap-6">
            <Fieldset className="flex flex-col gap-4 items-center">
              <Legend className="hidden">Login Form</Legend>
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
              <FieldInput
                label="Password"
                placeholder="********"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                icon
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              <div
                className="w-full font-Poppins text-sm text-medium text-customTextPink2 text-left cursor-pointer"
                onClick={() => setAuthSection("forgotPassword")}
              >
                Forgot Password?
              </div>
            </Fieldset>
            {error && <div className="text-red-500">{error}</div>}
            <Fieldset className="flex flex-col gap-4 items-center">
              <Legend className="hidden">Login Button</Legend>
              <PrimaryButton
                type="submit"
                text="Log in"
                isFull
                disabled={isSubmitting || loading}
              />
            </Fieldset>
            <Fieldset className="flex flex-col gap-4 items-center">
              <Legend className="hidden">Sign up Link</Legend>
              <div className="flex font-Poppins text-customBgGray text-md text-center gap-2">
                Don&apos;t have an account?
                <span
                  className="text-customTextPink2 underline cursor-pointer"
                  onClick={() => setAuthSection("signup")}
                >
                  Sign up
                </span>
              </div>
            </Fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
}
