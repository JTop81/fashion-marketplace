import React from "react";
import { IoClose } from "react-icons/io5";
import { Stepper } from "common/index";

const StepWrapper = ({
  handleModalClick,
  setIsModalOpen,
  children,
  maxSteps,
  step,
}: any) => {
  return (
    <div
      className="flex relative w-[96%] py-[15px] w-screen md:max-w-[958px] mx-0 md:mx-[auto] md:my-[20px] h-screen md:max-h-[770px] justify-center p-[30px] flex-col items-center gap-[0] flex-shrink-0 rounded-[22px] bg-[var(--background-colour-light,_#fff)] my-0 pt-[95px] md:pb-[0px]"
      onClick={handleModalClick}
    >
      <IoClose
        className="absolute top-[35px] right-[35px] cursor-pointer w-[24px] h-[24px]"
        onClick={() => setIsModalOpen(false)}
      />
      <Stepper activeStep={step} maxSteps={maxSteps} />
      <div className="md:max-h-[100%]  max-w-full w-full h-[100%] align-self-end content-center items-center flex-col overflow-scroll	overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default StepWrapper;
