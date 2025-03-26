import { Field } from "formik";

import { FlowProps } from "../../models";

export const CustomText: React.FC<FlowProps> = ({ formik }: any) => {
  return (
    <div className="flex md:px-[32px] py-0 flex-col flex-shrink-0 justify-center items-center gap-[24px] h-full max-h-[600px]">
      <div className="flex items-center justify-between">
        <p className="text-[#000] font-[Poppins] text-[24px] not-italic font-semibold leading-[150%] mx-[auto] my-[10px]">
          Customize Your Experience
        </p>
      </div>
      <p className="capitalize font-[Poppins] text-[#4A037D] text-[18px] not-italic font-semibold leading-[150%] w-full text-align-start text-transform-none">
        {
          "Type in anything that didn't fit our categories to help us customize your experience"
        }
      </p>
      <Field
        as="textarea"
        multiline="true"
        name="free_text"
        value={formik.values.free_text}
        onChange={formik.handleChange}
        placeholder="Write something"
        className="w-full h-[160px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
      />
      <button
        className="w-fit h-[48px] px-[24px] bg-secondary rounded-[6px] text-[16px] text-white font-semibold leading-[24px] mt-auto"
        type="submit"
      >
        I&apos;m Done &nbsp; -&gt;
      </button>
    </div>
  );
};
