import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit3, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { uploadFileToS3 } from "api/services/assets";
import {
  AssetType,
  FileType,
  IRecordAsset,
} from "api/services/assets/interfaces/asset.interface";
import { IPresignedUrlResponse } from "api/services/users/interfaces/user-response.interface";
import { FormikProps } from "formik";
import { useAuthStore } from "setup/store/auth/authStore";
import { v4 as uuid } from "uuid";

import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from "./constants";

const UserUploadAvatar = ({
  formik,
  uploadAvatar,
}: {
  formik?: FormikProps<any>;
  uploadAvatar: (avatar: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Image preview state
  const { user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const handleEditClick = () => {
    fileInputRef.current!.click();
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
      return () => clearTimeout(timeout); // Cleanup on component unmount or error change
    }
  }, [error]);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]; // Get the selected file
      if (!file) return;
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          "File type is not allowed, Please select a JPG, PNG, or WEBP image.",
        );
        event.target.value = "";
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB) {
        setError("File size is too large, Please select a file less than 5MB.");
        event.target.value = "";
        return;
      }
      setError(null);
      // Set the preview URL for immediate display
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      let fullUrl = "";
      setIsLoading(true);
      await uploadFileToS3(file, AssetType.AVATAR, user?.id || uuid()).then(
        (res: IPresignedUrlResponse) => {
          fullUrl =
            res.url +
            res.fields.key.replace(
              new RegExp(
                `.(${
                  FileType[
                    file.type
                      .split("/")[1]
                      .toUpperCase() as keyof typeof FileType
                  ]
                })$`,
                "i",
              ),
              `.${FileType.WEBP.toLowerCase()}`,
            );
          uploadAvatar(fullUrl);
          const recordBody: IRecordAsset = {
            related_id: user?.id ?? "",
            asset_type: AssetType.AVATAR,
            file_type:
              FileType[
                file.type.split("/")[1].toUpperCase() as keyof typeof FileType
              ],
            url: res.url + res.fields.key,
          };
          formik?.setFieldValue("recordAssetBody", recordBody);
          setIsLoading(false); // Once the upload is finished
        },
      );
    },
    [user?.id, uploadAvatar, formik], // Add dependencies here
  );

  return (
    <div className="flex items-center flex-col gap-2">
      <div className="relative">
        {isLoading ? (
          <div className="w-12 h-12 rounded-full bg-gray-300" />
        ) : previewUrl ? (
          // Show the preview image immediately after selection
          <img
            className="w-[72px] h-[72px] flex-shrink-0 rounded-full object-cover"
            src={previewUrl}
            alt="Preview"
          />
        ) : (
          // Fallback to showing the default user icon
          <div className="relative flex justify-center h-[72px] w-[72px] items-center bg-[#FF9085] rounded-full">
            <FiUser
              className="w-[24px] h-[24px] flex-shrink-0"
              color="#CC736A"
            />
          </div>
        )}

        <div className="absolute w-[26px] h-[26px] bottom-0 right-0 bg-white rounded-full flex justify-center items-center cursor-pointer">
          {!isLoading && (
            <>
              <FiEdit3
                className="w-[16px] h-[16px] flex-shrink-0"
                onClick={handleEditClick}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </>
          )}
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default UserUploadAvatar;
