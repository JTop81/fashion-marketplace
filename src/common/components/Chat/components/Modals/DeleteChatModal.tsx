import React, { Dispatch, SetStateAction } from "react";
import Modal from "common/components/Modal";

const DeleteChatModal = ({
  setIsDeleteModalOpen,
}: {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal setIsModalOpen={setIsDeleteModalOpen}>
      <div className="p-16 gap-6 bg-white rounded flex flex-col items-center justify-center">
        <div className="text-black text-lg font-semibold font-['Poppins'] leading-relaxed">
          Are your sure you want to delete this chat?
        </div>
        <div className="w-96 text-center text-black text-sm font-normal font-['Poppins'] leading-tight">
          All chats will be cleared and user will be no longer in the chat list
          until new chat
        </div>
        <div className="w-72 h-12 relative">
          <button className="w-36 h-12 px-6 py-3 left-[153px] top-0 absolute bg-blue-500 rounded-md justify-start items-start gap-2 inline-flex">
            <span className="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
              Yes, Delete
            </span>
          </button>
          <button className="w-36 h-12 px-6 py-3 left-0 top-0 absolute rounded-md border border-neutral-400 justify-start items-start gap-2 inline-flex">
            <span className="text-center text-neutral-400 text-base font-semibold font-['Poppins'] leading-normal">
              No, cancel
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteChatModal;
