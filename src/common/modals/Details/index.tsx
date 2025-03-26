import { PrimaryButton } from "common";
import CustomPhoneInput from "common/components/CustomPhoneInput";
import DropDownSelection from "common/components/DropDown";
import { Error } from "common/components/InputField";
import {
  About,
  AboutTitle,
  Controllers,
  FluidRow,
  FormContainer,
  GroupFluid,
  InputContainer,
  SignIn,
} from "common/styles/Shared/MultiStepForm";
import { Field } from "formik";

import {
  CountryOptions,
  FlowProps,
} from "pages/public-home/components/Onboarding/models";

export const Details: React.FC<FlowProps> = ({
  handleNext,
  formik,
}: FlowProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-max">
      <AboutTitle>
        <About>Tell us about your self</About>
      </AboutTitle>
      <FormContainer>
        <Controllers>
          <SignIn>
            <GroupFluid>
              <FluidRow>
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
                    onChange={(value: string) => {
                      formik.setFieldValue("phoneNumber", value);
                    }}
                  />
                  <Error className="text-xs">{formik.errors.phoneNumber}</Error>
                </div>
              </FluidRow>
              <FluidRow>
                <div className="flex flex-wrap md:flex-nowrap w-full gap-[15px]">
                  <div className="w-1/2 flex flex-col gap-[7px] flex-grow">
                    <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
                      Country *
                    </p>
                    <InputContainer>
                      <DropDownSelection
                        name="country"
                        label="Country"
                        options={CountryOptions}
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        error={formik.errors.country}
                      />
                    </InputContainer>
                  </div>
                  <div className="flex min-w-[250px] flex-grow  gap-[15px]">
                    <div className="w-1/2 flex flex-col gap-[7px]">
                      <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
                        Zip Code *
                      </p>
                      <Field
                        type="text"
                        name="zipcode"
                        placeholder="Zip Code"
                        value={formik.values.zipcode}
                        onChange={formik.handleChange}
                        className="w-full h-[45.6px] rounded-[6px] px-[18px] py-[16px] border-[1px] border-[#0d6caf]"
                      />
                      <Error className="text-xs -mt-1.5">
                        {formik.errors.zipcode}
                      </Error>
                    </div>
                    <div className="w-1/2 flex flex-col gap-[7px]">
                      <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
                        State *
                      </p>
                      <InputContainer>
                        <DropDownSelection
                          name="state"
                          label="State"
                          options={["New York"]}
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          error={formik.errors.state}
                        />
                      </InputContainer>
                    </div>
                  </div>
                </div>
              </FluidRow>

              <FluidRow>
                <div className="w-full flex flex-col gap-[7px]">
                  <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
                    Address 1 *
                  </p>
                  <Field
                    type="text"
                    name="address1"
                    placeholder="Address 1"
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    className="w-full h-[57px] rounded-[6px] px-[18px] py-[16px] border-[1px] border-[#BFBFBF]"
                  />
                  <Error className="text-xs">{formik.errors.address1}</Error>
                </div>
              </FluidRow>

              <FluidRow>
                <div className="w-full flex flex-col gap-[7px]">
                  <p className="text-[14px] text-[#4D5059] font-medium leading-[21px]">
                    Address line 2
                  </p>
                  <Field
                    type="text"
                    name="address2"
                    placeholder="Address 2"
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    error={formik.errors.address2}
                    className="w-full h-[57px] rounded-[6px] px-[18px] py-[16px] border-[1px] border-[#BFBFBF]"
                  />
                </div>
              </FluidRow>

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
            </GroupFluid>
          </SignIn>
          <PrimaryButton
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleNext && handleNext(formik, e)
            }
            text="Next"
            isSubmitting={formik.isSubmitting}
          />
        </Controllers>
      </FormContainer>
    </div>
  );
};
