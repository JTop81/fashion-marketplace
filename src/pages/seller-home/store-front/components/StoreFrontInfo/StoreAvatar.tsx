import { useQueryClient } from "@tanstack/react-query";
import {
  AssetType,
  IAsset,
} from "api/services/assets/interfaces/asset.interface";
import { removeUserAvatar } from "api/services/store-front";
import FileUpload from "common/components/UploadAsset/FileUpload";
import { useAuthStore } from "setup/store/auth/authStore";

type StoreAvatarProps = {
  avatar: string;
  isOwner?: boolean;
};

export default function StoreAvatar(props: StoreAvatarProps) {
  const { avatar, isOwner } = props;
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const handleUploadSuccess = async (url: string, response: IAsset | null) => {
    try {
      if (!url && !response) {
        // This is a remove operation
        await removeUserAvatar();
        // Update auth store state
        if (user) {
          useAuthStore.getState().setUser({
            ...user,
            avatar: null as unknown as IAsset,
          });
        }
      } else if (url && response) {
        // Update auth store state
        useAuthStore
          .getState()
          .setUser(user ? { ...user, avatar: response } : null);
      }
    } catch (error) {
      console.error("Failed to handle avatar operation:", error);
    }
  };

  if (!isOwner) {
    return (
      <div className="flex justify-center mt-3 lg:mr-6">
        <div className="w-[120px] h-[120px]">
          <img
            src={avatar || "/default-avatar.png"}
            alt="Store Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-3 lg:mr-6">
      <div className="w-[120px] h-[120px]">
        <FileUpload
          initialImage={avatar || undefined}
          assetType={AssetType.AVATAR}
          userId={user?.id || ""}
          onUploadSuccess={handleUploadSuccess}
          additionalData={(response) => ({
            username: user?.username || "",
            phone: user?.phone || "",
            avatar_id: response?.id || null,
            status: "ACTIVE",
          })}
          type="modal"
          buttonText="Upload Store Logo"
        />
      </div>
    </div>
  );
}
