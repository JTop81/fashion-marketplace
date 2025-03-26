import React from "react";
import CustomPhoneInput from "common/components/CustomPhoneInput";
import { Error } from "common/components/InputField";
import UserUploadAvatar from "common/components/UploadAsset/UserUploadAvatar";
import { Field } from "formik";

import { FlowProps } from "pages/public-home/components/Onboarding/models";

import { useBuyerMultiStepFormStore } from "../store";

import "react-toastify/dist/ReactToastify.css";

export const BuyerDetails: React.FC<FlowProps> = ({ handleNext, formik }) => {
  const { updateUserAvatar } = useBuyerMultiStepFormStore();
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full max-w-[500px] flex flex-col gap-[36px] justify-center items-center pb-5">
        <div className="w-full flex flex-col gap-[32px]">
          <div className="flex items-center justify-between">
            <p className="text-[#000] font-[Poppins] text-[24px] not-italic font-semibold leading-[150%] mx-[auto] my-[10px]">
              Your personal Information
            </p>
          </div>
          <div className="w-full flex flex-col gap-[16px] justify-center items-center">
            <UserUploadAvatar formik={formik} uploadAvatar={updateUserAvatar} />
            <p className="text-[16px] text-black font-semibold leading-[24px]">
              Set profile picture
            </p>
          </div>
          <div className="w-full flex flex-col gap-[7px]">
            <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
              Username *
            </p>
            <Field
              type="text"
              name="username"
              placeholder="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
              className="w-full h-[57px] rounded-[6px] px-[18px] py-[16px] border-[1px] border-[#BFBFBF]"
            />
            <Error className="text-xs">{formik.errors.username}</Error>
          </div>
          <div className="w-full flex flex-col gap-[7px]">
            <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
              Phone Number
            </p>
            <CustomPhoneInput
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={(value: string) =>
                formik.setFieldValue("phoneNumber", value)
              }
            />
            <Error className="text-xs">{formik.errors.phoneNumber}</Error>
          </div>
          <div className="flex flex-col gap-[24px]">
            <p className="text-[18px] text-[#4A037D] font-semibold leading-[27px]">
              Please specify where you want to get UNIK update on?
            </p>
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-row gap-[44px]"
            >
              <label className="flex flex-row gap-2">
                <Field type="checkbox" name="checked" value="email" />
                <p className="text-[16px] text-[#4D5059] font-medium leading-[24px]">
                  Via Email
                </p>
              </label>
              <label className="flex flex-row gap-2">
                <Field type="checkbox" name="checked" value="sms" />
                <p className="text-[16px] text-[#4D5059] font-medium leading-[24px]">
                  Via SMS
                </p>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[24px] justify-center items-center pb-10 md:pb-0">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleNext && handleNext(formik, e)
            }
            type="button"
            className="flex flex-row items-center justify-center p-2 px-6 gap-2 bg-blue-500 border-blue-500 rounded transition-all duration-200 font-poppins font-semibold text-lg leading-6 text-white hover:bg-blue-500 hover:border-blue-500 active:bg-blue-500 active:border-blue-500 w-full md:w-fit"
          >
            {"Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
