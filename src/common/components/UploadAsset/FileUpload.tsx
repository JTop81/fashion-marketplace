import { FC, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { recordAsset, uploadFileToS3 } from "api/services/assets";
import {
  AssetType,
  FileType,
  IRecordAsset,
} from "api/services/assets/interfaces/asset.interface";
import { updateUser } from "api/services/users";
import { IUpdateUser } from "api/services/users/interfaces/user.interface";
import { IPresignedUrlResponse } from "api/services/users/interfaces/user-response.interface";
import axios from "axios";
import DragDropUpload from "common/components/DragDropUpload";
import { transformError } from "utils/transformError";
import { v4 as uuid } from "uuid";

import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from "./constants";

interface FileUploadProps {
  initialImage?: string;
  assetType: AssetType;
  onUploadSuccess: (url: string, response: any) => void;
  userId: string;
  additionalData?: (response: any) => IUpdateUser;
  buttonText?: string;
  type?: "page" | "modal";
}

const FileUpload: FC<FileUploadProps> = ({
  initialImage,
  assetType,
  onUploadSuccess,
  userId,
  additionalData,
  type = "page",
  buttonText,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | undefined>(initialImage);

  const validateAndProcessFile = useCallback((file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error(
        "File type is not allowed. Please select a JPG, PNG, or WEBP image.",
      );
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB) {
      toast.error(
        "File size is too large. Please select a file less than 5MB.",
      );
      return false;
    }
    return true;
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!validateAndProcessFile(file)) return;

      setIsLoading(true);
      // Create preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      try {
        const res: IPresignedUrlResponse = await uploadFileToS3(
          file,
          assetType,
          userId || uuid(),
        );

        const fullUrl =
          res.url +
          res.fields.key.replace(
            new RegExp(
              `.(${
                FileType[
                  file.type.split("/")[1].toUpperCase() as keyof typeof FileType
                ]
              })$`,
              "i",
            ),
            `.${FileType.WEBP.toLowerCase()}`,
          );

        const recordBody: IRecordAsset = {
          related_id: userId,
          asset_type: assetType,
          file_type:
            FileType[
              file.type.split("/")[1].toUpperCase() as keyof typeof FileType
            ],
          url: res.url + res.fields.key,
        };
        const response = await recordAsset(recordBody);

        onUploadSuccess(fullUrl, response);
        if (additionalData) {
          const data = additionalData(response);
          await updateUser(userId, data).catch((error) => {
            if (axios.isAxiosError(error)) {
              const userFriendlyMessage = transformError(error.response);
              toast.error(userFriendlyMessage);
            }
          });
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setPreview(initialImage);
        toast.error("Failed to upload image");
      } finally {
        setIsLoading(false);
      }
    },
    [
      assetType,
      userId,
      initialImage,
      onUploadSuccess,
      additionalData,
      validateAndProcessFile,
    ],
  );

  const handleRemove = useCallback(async () => {
    try {
      setIsLoading(true);
      setPreview(undefined);

      if (additionalData) {
        const data = additionalData({ id: null });
        await updateUser(userId, data);
      }

      onUploadSuccess("", { id: null });
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Remove failed:", error);
      setPreview(initialImage);
      toast.error("Failed to remove image");
    } finally {
      setIsLoading(false);
    }
  }, [userId, initialImage, onUploadSuccess, additionalData]);

  return (
    <DragDropUpload
      initialImage={preview}
      onFileSelect={handleFileSelect}
      onRemove={handleRemove}
      isLoading={isLoading}
      containerClassName={
        type === "modal" ? "flex justify-center mt-6" : undefined
      }
      dropzoneText={buttonText || "Drag and drop, or browse"}
      size="lg"
    />
  );
};

export default FileUpload;
