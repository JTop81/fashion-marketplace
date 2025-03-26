import React from "react";
import clsx from "clsx";

export interface PopStepperProps {
  currentStep: number;
}

const PopupStepperComponents: React.FC<PopStepperProps> = ({ currentStep }) => {
  const stepTitles = [
    "Product Details",
    "Billing Details",
    "Shipping Details",
    "Review & Pay",
  ];

  return (
    <div className="flex items-center">
      {stepTitles.map((title, index) => (
        <div className="flex flex-col" key={`stepTitle-${index.toString()}`}>
          <div className={clsx("flex items-center", index === 0 && "ml-2.5")}>
            <div
              className={clsx(
                "w-7 h-7 flex-shrink-0 flex justify-center items-center rounded-full text-xs font-medium leading-[150%] font-display",
                currentStep === index + 1
                  ? "border border-customTextPink bg-primarySecondary text-customTextPink"
                  : "border border-[#CBCBCB] bg-transparent text-black",
              )}
            >
              {index + 1}
            </div>
            {index < stepTitles.length - 1 && (
              <div className="h-0.5 bg-customTextPink w-[98px] md:w-[60px]" />
            )}
          </div>
          <div className="text-black text-start mt-1.5 -ml-4 text-[10px] font-normal leading-[150%] font-display">
            {title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopupStepperComponents;
