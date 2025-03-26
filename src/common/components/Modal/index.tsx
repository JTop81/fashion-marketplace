import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  setIsModalOpen: any;
};
export const Modal = ({ children, setIsModalOpen }: ModalProps) => {
  const handleBackgroundClick = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.classList.add("overflow-hidden");

    // Cleanup function to reset overflow
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return createPortal(
    <div
      className="fixed w-full h-screen  bg-[rgba(0,0,0,0.5)] z-[100000] left-0 top-0 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      {children}
    </div>,
    document.body,
  );
};

export default Modal;
