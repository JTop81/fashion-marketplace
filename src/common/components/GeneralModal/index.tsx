import { IoMdClose } from "react-icons/io";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";

import { CloseButton } from "../SelectVariations/style";
interface GeneralModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  modalClasses?: string;
}

export const GeneralModal = ({
  isOpen,
  closeModal,
  children,
  title,
  description,
  modalClasses,
}: GeneralModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className={clsx("z-[1500] relative", modalClasses || "")}
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />

      <div
        className={clsx(
          "fixed inset-0 flex w-screen h-screen items-end justify-center",
          // responsive classes
          "lg:items-center",
        )}
      >
        <Dialog.Panel
          className={clsx(
            "w-full bg-white rounded-tl-3xl rounded-tr-3xl p-4",
            // responsive classes
            "lg:w-fit lg:rounded-3xl",
          )}
        >
          {title && (
            <Dialog.Title className="text-xl font-semibold flex justify-between">
              {title}
              <CloseButton onClick={() => closeModal()}>
                <IoMdClose size={20} color="black" />
              </CloseButton>
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="text-sm font-normal text-black/60">
              {description}
            </Dialog.Description>
          )}

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
