import { useState } from "react";

// Define types
interface ModalState {
  isOpen: boolean;
}

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

// Combine types for the hook return type
type ModalHookReturnType = ModalState & ModalActions;

// Custom hook to manage modal state
export const useModalState = (): ModalHookReturnType => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Return combined state and actions
  return {
    isOpen,
    openModal,
    closeModal,
  };
};
