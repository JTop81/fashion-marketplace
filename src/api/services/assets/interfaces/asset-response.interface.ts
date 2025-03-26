import { AssetType, FileType } from "./asset.interface";

export interface IAssetResponse {
  id: string;
  related_id: string;
  asset_type: AssetType;
  file_type: FileType;
  url: string;
  created_at: string;
  updated_at: string;
}
