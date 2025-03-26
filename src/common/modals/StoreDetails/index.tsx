import React from "react";
import { IoMdClose } from "react-icons/io";
import DropDownSelection from "common/components/DropDown";
import { Error } from "common/components/InputField";
import { CloseButton } from "common/components/SelectVariations/style";
import UserUploadAvatar from "common/components/UploadAsset/UserUploadAvatar";
import { Field, FieldArray } from "formik";
import { useBrandBoutiqueMultiStepFormStore } from "setup/store/profile/brandBoutique/brandBoutique";

import { FlowProps } from "pages/public-home/components/Onboarding/models";

const websites = ["youtube", "linkedin"];

export const StoreDetails: React.FC<FlowProps> = ({ handleNext, formik }) => {
  const { updateBrandLogo } = useBrandBoutiqueMultiStepFormStore();

  return (
    <div className="flex flex-col items-center w-full h-max">
      <div className="w-full max-w-[500px] flex flex-col gap-[36px] justify-center items-center pb-6">
        <div className="w-full flex flex-col gap-[16px] overflow-auto">
          <div className="flex items-center justify-between">
            <p className="text-[#000] font-[Poppins] text-[24px] not-italic font-semibold leading-[150%] mx-[auto] my-[10px]">
              Your Brand Details
            </p>
          </div>
          <div className="w-full flex flex-col gap-[16px] justify-center items-center">
            <UserUploadAvatar formik={formik} uploadAvatar={updateBrandLogo} />
            <p className="text-[16px] text-black font-semibold leading-[24px]">
              Add Brand Logo
            </p>
          </div>
          <div className="w-full flex flex-col gap-[7px]">
            <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
              Brand Name *
            </p>
            <Field
              type="text"
              name="name"
              placeholder="Name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name}
              className="w-full h-[57px] rounded-[6px] px-[18px] py-[16px] border-[1px] border-[#BFBFBF]"
            />
            <Error className="text-xs">{formik.errors.name}</Error>
          </div>
          <div className="w-full flex flex-col gap-[7px]">
            <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
              Brand Description
            </p>
            <Field
              as="textarea"
              multiline="true"
              name="bio"
              placeholder="What your brand is about..."
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.errors.bio}
              className="w-full h-[120px] rounded-[6px] px-[18px] py-[16px] border-[1px] border-[#BFBFBF]"
            />
            <Error className="text-xs">{formik.errors.bio}</Error>
          </div>

          <FieldArray name="websites">
            {({ push, remove }) => (
              <div className="w-full flex flex-col gap-[7px]">
                <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
                  Links
                </p>
                <div className="w-full flex flex-col gap-2">
                  {Array.isArray(formik.values.websites) &&
                    formik.values.websites.map(
                      (website: string, index: number) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div
                          key={`formik-${index.toString()}`}
                          className="w-full flex flex-row gap-4"
                        >
                          <DropDownSelection
                            name={`websites.${index}`}
                            label="Website"
                            options={websites}
                            error={formik.errors.websites?.[index]}
                            style={{ marginBottom: "0px" }}
                          />
                          <Field
                            type="text"
                            name={`websites.${index}`}
                            placeholder="www.myflair.com/home"
                            value={website}
                            onChange={formik.handleChange}
                            className="w-full h-[57px] rounded-[6px] px-[18px] py-[16px] border-[1px] border-[#BFBFBF]"
                          />
                          <CloseButton
                            type="button"
                            onClick={() => remove(index)}
                            className="right-2 m-auto" // Position button to the right inside the container
                          >
                            <IoMdClose size={20} color="black" />
                          </CloseButton>
                        </div>
                      ),
                    )}
                  <button
                    type="button"
                    className="text-[14px] text-[#9F00D9] font-normal leading-[21px] underline cursor-pointer text-left"
                    onClick={() => push("")} // Push an empty string for a new website
                  >
                    Add more
                  </button>
                </div>
              </div>
            )}
          </FieldArray>
        </div>

        <div className="flex flex-row gap-[24px] justify-center items-center">
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
