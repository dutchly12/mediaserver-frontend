export enum StorageUploadStatus {
  QUEUED = 'queued',
  PREPARING = 'preparing',
  UPLOADING = 'uploading',
  UPLOADED = 'uploaded',
  ERROR = 'error',
}

export type UploadSuccessCallback = (id: string, name: string) => void;

export interface StorageUpload {
  id: number;
  name: string;
  total: number;
  loaded: number;
  progress: number;
  status: StorageUploadStatus;
  file: File;
  callback: UploadSuccessCallback;
}
