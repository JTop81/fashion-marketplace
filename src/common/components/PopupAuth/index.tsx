import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useAuthStore } from "setup/store/auth/authStore";

import ForgotPasswordPopup from "./ForgotPassword";
import LoginPopup from "./Login";
import SignupPopup from "./Signup";
import VerifyEmailPopup from "./VerifyEmail";

interface PopupAuthProps {
  isOpen: boolean;
  closeModal: () => void;
}

const PopupAuth = ({ isOpen, closeModal }: PopupAuthProps) => {
  const { authSection, setAuthSection, isEmailVerified } = useAuthStore();

  useEffect(() => {
    if (isEmailVerified === false && authSection !== "verifyEmail") {
      setAuthSection("verifyEmail");
    }
  }, [isEmailVerified, authSection, setAuthSection]);

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />
      <div
        className={clsx(
          "fixed inset-0 flex w-screen h-screen items-end justify-center",
          "lg:items-center",
        )}
      >
        <Dialog.Panel
          className={clsx(
            "relative w-full bg-white p-12 lg:px-16 px-4",
            "lg:w-fit lg:rounded-xl",
          )}
        >
          <IoClose
            className="absolute top-[35px] right-[35px] cursor-pointer w-[24px] h-[24px]"
            onClick={() => setAuthSection(null)}
          />
          {authSection === "verifyEmail" && <VerifyEmailPopup />}
          {authSection === "login" && <LoginPopup />}
          {authSection === "forgotPassword" && <ForgotPasswordPopup />}
          {authSection === "signup" && <SignupPopup />}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PopupAuth;
