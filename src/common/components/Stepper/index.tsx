import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import clsx from "clsx";

interface StepperProps {
  activeStep: number;
  maxSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ activeStep, maxSteps }) => {
  const steps = [];

  for (let i = 1; i <= maxSteps; i++) {
    steps.push(
      <React.Fragment key={i}>
        <div
          className={clsx(
            "flex justify-center items-center rounded-full font-display text-base font-semibold leading-[150%] text-customTextPink",
            "lg:w-11 lg:h-11",
            "w-[38px] h-[38px]",
            i <= activeStep
              ? "border border-customTextPink bg-primarySecondary"
              : "border border-[#CBCBCB] bg-transparent",
          )}
        >
          {i < activeStep ? <IoMdCheckmark /> : i}
        </div>
        {i < maxSteps && (
          <div className="h-0.5 bg-customTextPink lg:w-[55px] w-10" />
        )}
      </React.Fragment>,
    );
  }

  return (
    <div className="absolute top-[30px] max-w-full flex items-center">
      {steps}
    </div>
  );
};

export default React.memo(Stepper);
