export enum AssetType {
  POST = "post",
  COMMENT = "comment",
  AVATAR = "avatar",
}

export enum FileType {
  MP4 = "mp4",
  JPEG = "jpeg",
  JPG = "jpg",
  PNG = "png",
  WEBP = "webp",
}

export interface IAsset {
  id: string;
  related_id: string;
  asset_type: AssetType;
  file_type: FileType;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface IRecordAsset {
  related_id: string;
  asset_type?: AssetType;
  file_type?: FileType;
  url: string;
}

export interface UploadError {
  message: string;
  status?: number;
}

export interface IPresignedUrl {
  related_id: string;
  asset_type: AssetType;
  file_type: FileType;
  expiration: number;
}
