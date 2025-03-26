import React, { useState } from "react";
import { CiFlag1 } from "react-icons/ci";
import { FaArchive } from "react-icons/fa";
import { IoMdArrowBack, IoMdClose, IoMdMore } from "react-icons/io";
import { MdBlockFlipped, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ChatHeaderLayout from "common/components/Chat/components/ChatHeaderLayout";
import DeleteChatModal from "common/components/Chat/components/Modals/DeleteChatModal";
import OptionsList from "common/components/Chat/components/Options/OptionsList";
import { UserStatus } from "common/components/Chat/enums";
import { Chat } from "common/components/Chat/types/Chat";
import GeneralPopover from "common/components/GeneralPopover";
import { useIsMobile } from "common/hooks/useIsMobile";
import { Role } from "enums/role";
import { useChatStore } from "setup/store/chat/chatStore";

const ProfileHeader = ({
  currentChat,
  role,
  isPopUp,
}: {
  currentChat: Chat | null;
  role: Role;
  isPopUp: boolean;
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { setCurrentChat } = useChatStore();

  const handleBackClick = () => {
    navigate(`/${role}/chat`);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteChat = (chatId?: string) => {
    // When use chatId, must remove console
    console.log("will remove", chatId);
    setIsDeleteModalOpen((prev) => !prev);
  };

  const handleCloseClick = () => {
    setCurrentChat(null);
  };

  const userStatus = UserStatus.ONLINE;

  return (
    <ChatHeaderLayout>
      {currentChat && (
        <>
          <div className="flex gap-2">
            {isMobile && (
              <button onClick={handleBackClick}>
                <IoMdArrowBack size={24} />
              </button>
            )}
            <img
              className="w-11 h-11 rounded-full"
              src={currentChat.avatarSrc}
            />
            <div>
              <p className="text-black text-base font-semibold font-['Poppins'] leading-normal">
                {currentChat.author}
              </p>
              {userStatus === UserStatus.ONLINE && (
                <div className="flex gap-2 items-center">
                  <div className="w-2.5 h-2.5 bg-green-700 rounded-full"></div>{" "}
                  <p className="text-black text-sm font-normal font-['Poppins']">
                    {UserStatus.ONLINE}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <GeneralPopover
              location="bottom end"
              customPopoverBotton={
                <IoMdMore size={24} className="color-black z-100" />
              }
              customMenuStyles="z-[10000] w-40 h-max py-4 bg-white rounded-xl shadow flex-col justify-center items-start gap-2 inline-flex"
              menuItems={
                <OptionsList
                  options={[
                    { name: "Archive", icon: <FaArchive size={14} /> },
                    {
                      name: "Delete Chat",
                      icon: <MdDelete size={14} />,
                      onClick: () => handleDeleteChat(currentChat.id),
                    },
                    {
                      name: "Block User",
                      icon: <MdBlockFlipped size={14} />,
                    },
                    { name: "Report User", icon: <CiFlag1 size={14} /> },
                  ]}
                />
              }
            />
            {isPopUp && (
              <button onClick={handleCloseClick}>
                <IoMdClose />
              </button>
            )}
          </div>
          {isDeleteModalOpen && (
            <DeleteChatModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
          )}
        </>
      )}
    </ChatHeaderLayout>
  );
};

export default ProfileHeader;
