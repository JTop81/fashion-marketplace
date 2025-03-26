import ChatContainer from "common/components/Chat/ChatContainer";
import { useIsMobile } from "common/hooks/useIsMobile";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";

const ChatPage = ({ role }: { role: Role }) => {
  const { user } = useAuthStore();
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-screen">
      {!isMobile && (
        <h1 className="px-8 py-4 text-black flex items-center border-b-2 align-middle border-stone-100 h-12 text-2xl font-semibold font-['Poppins']">
          Chats
        </h1>
      )}

      <div className="p-8">
        <ChatContainer role={role} />
      </div>
    </div>
  );
};

export default ChatPage;
