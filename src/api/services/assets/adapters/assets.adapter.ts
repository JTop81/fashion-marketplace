import { IPresignedUrlResponse } from "../../users/interfaces/user-response.interface";
import { IAsset } from "../interfaces/asset.interface";
import { IAssetResponse } from "../interfaces/asset-response.interface";

export const assetAdapter = (assetResponse: IAssetResponse): IAsset => {
  return assetResponse;
};

export const presignedAdapter = (
  presignedResponse: IPresignedUrlResponse, // Update type to IPresignedUrlResponse
): IPresignedUrlResponse => {
  return {
    fields: presignedResponse.fields, // Ensure you're correctly passing the fields
    url: presignedResponse.url, // Ensure you're correctly passing the URL
  };
};
