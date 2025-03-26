import React from "react";
import { logo } from "assets";
import Image from "common/components/Image";
import { useAuthStore } from "setup/store/auth/authStore";

import PrimaryButton from "../PrimaryButton";

const VerifyEmailPopup: React.FC = () => {
  const checkEmailVerification = useAuthStore(
    (state) => state.checkEmailVerification,
  );
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.isLoading);

  return (
    <>
      <div className="flex justify-center flex-col items-center gap-4 py-4 hidden lg:flex">
        <Image src={logo} width="72" alt="logo" height="72" />
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="font-Poppins font-medium text-base text-customTextGray2 text-center">
            Please verify your email!
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <PrimaryButton
            onClick={checkEmailVerification}
            text="Confirm Verification!"
            isFull
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPopup;
