import axios from "axios";

import { getAxiosInstance } from "../../axios";
import {
  GETPRESIGNEDURL,
  RECORDASSET,
} from "../../constants/endpoints.constants";
import {
  IPresignedUrlResponse,
  IRecordAssetResponse,
} from "../users/interfaces/user-response.interface";

import { assetAdapter, presignedAdapter } from "./adapters/assets.adapter";
import {
  AssetType,
  FileType,
  IPresignedUrl,
  IRecordAsset,
  UploadError,
} from "./interfaces/asset.interface";

export const recordAsset = async (
  data: IRecordAsset,
): Promise<IRecordAssetResponse> => {
  const api = await getAxiosInstance();
  const response = await api.post<IRecordAssetResponse>(RECORDASSET, data);
  return assetAdapter(response?.data);
};

export const uploadImage = async (
  formData: FormData,
  url: string,
): Promise<UploadError | undefined> => {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 204 || response.status === 200) {
      return {
        status: response.status,
        message: "File uploaded successfully!",
      };
    } else {
      return {
        message: "Failed to upload file.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      message: error?.message || "An error occurred during file upload.",
    };
  }
};

export const getPresignedUrls = async (
  data: IPresignedUrl,
): Promise<IPresignedUrlResponse> => {
  const api = await getAxiosInstance();
  const response = await api.post<IPresignedUrlResponse>(GETPRESIGNEDURL, data);
  if (!response?.data?.url) {
    throw new Error("Failed to get presigned URL");
  }
  return presignedAdapter(response?.data);
};

export const uploadFileToS3 = async (
  file: File,
  assetType: AssetType,
  related_id: string,
): Promise<IPresignedUrlResponse> => {
  const data: IPresignedUrl = {
    related_id,
    asset_type: assetType,
    file_type:
      FileType[file.type.split("/")[1].toUpperCase() as keyof typeof FileType],
    expiration: 3600,
  };
  const res: IPresignedUrlResponse = await getPresignedUrls(data);

  const formData = new FormData();
  formData.append("Content-Type", res.fields["Content-Type"]);
  formData.append("key", res.fields.key);
  formData.append("AWSAccessKeyId", res.fields.AWSAccessKeyId);
  formData.append("policy", res.fields.policy);
  formData.append("signature", res.fields.signature);
  formData.append("file", file);

  // Upload the file using the signed URL
  await uploadImage(formData, res.url);
  return res;
};
