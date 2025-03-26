import { useCallback, useEffect, useState } from "react";
import { uploadFileToS3 } from "api/services/assets";
import {
  AssetType,
  FileType,
  IRecordAsset,
} from "api/services/assets/interfaces/asset.interface";
import MultiImageUpload from "common/components/DragDropUpload/MultiImageUpload";

import { OverviewStepProps } from "../overview-step/model";

type ImagePreviewListProps = {
  formik: OverviewStepProps;
  size: number;
  related_id: string;
};

type InternalPreview = { content: string; name: string }[];

export const ImagePreviewListEdit = ({
  formik: {
    setFieldValue,
    values: { previews },
    errors: { previews: errors },
  },
  related_id,
  size,
}: ImagePreviewListProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<InternalPreview>(previews);

  useEffect(() => {
    setImagePreviews(previews);
  }, [previews]);

  const handleUpload = useCallback(
    async (file: File) => {
      const response = await uploadFileToS3(file, AssetType.POST, related_id);
      if (response) {
        const recordBody: IRecordAsset = {
          related_id,
          asset_type: AssetType.POST,
          file_type:
            FileType[
              file.type.split("/")[1].toUpperCase() as keyof typeof FileType
            ],
          url: response.url + response.fields.key,
        };
        setFieldValue("recordAssetBody", recordBody);
        return response.url + response.fields.key;
      }
      return null;
    },
    [related_id, setFieldValue],
  );

  const handleFilesSelect = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      try {
        const fileReaderPromises = files.map((file) => {
          return new Promise<{ content: string; name: string }>((resolve) => {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
              if (!fileReader.result) return;
              let content = "";
              if (typeof fileReader.result === "string") {
                content = fileReader.result;
              } else if (fileReader.result instanceof ArrayBuffer) {
                const decoder = new TextDecoder();
                content = decoder.decode(fileReader.result);
              }
              resolve({
                name: file.name,
                content,
              });
            };
            fileReader.readAsDataURL(file);
          });
        });

        const uploadPromises = files.map((file) => handleUpload(file));

        const [previewResults] = await Promise.all([
          Promise.all(fileReaderPromises),
          Promise.all(uploadPromises),
        ]);

        const newPreviews = [...previews, ...previewResults];
        setFieldValue("previews", newPreviews);
        setImagePreviews(newPreviews);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [previews, setFieldValue, handleUpload],
  );

  const handleRemove = useCallback(
    (index: number) => {
      const newPreviews = [...previews];
      newPreviews.splice(index, 1);
      setFieldValue("previews", newPreviews);
      setImagePreviews(newPreviews);
    },
    [previews, setFieldValue],
  );

  return (
    <div className="w-full">
      <MultiImageUpload
        initialImages={imagePreviews.map((preview) => preview.content)}
        onFilesSelect={handleFilesSelect}
        onRemove={handleRemove}
        isLoading={isUploading}
        maxImages={size}
        dropzoneText="Drag and drop product images here, or click to select"
      />
      {errors && <p className="text-red-500 mt-2">{errors.toString()}</p>}
    </div>
  );
};
