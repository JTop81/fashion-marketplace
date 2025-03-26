import React from "react";
import clsx from "clsx";

const PrimaryButton = ({
  onClick,
  text,
  type,
  icon,
  isSubmitting = false,
  isFull = false,
  isOutlined = false,
}: any) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
      className={clsx(
        "flex justify-center p-3 px-6 border-2 border-blue-500 rounded-md transition-all font-poppins font-semibold text-base leading-6",
        {
          "w-full": isFull,
          "text-blue-500 bg-white": isOutlined,
          "text-white bg-blue-500": !isOutlined,
        },
      )}
    >
      {text}
      {icon && icon}
    </button>
  );
};

export const SocialLoginButton = ({ icon, type, text, onClick }: any) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex p-[18px] min-w-[104px] py-4 gap-2 border rounded-md border-[#BFBFBF] bg-white justify-center gap-1 lg:min-w-[135px]"
    >
      {icon && icon}
      {text && text}
    </button>
  );
};

export default PrimaryButton;
