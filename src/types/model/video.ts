export enum VideoStatus {
  UNPROCESSED = 'unprocessed',
  PROCESSING = 'processing',
  PROCESSED = 'processed'
}

export interface CollectionVideo {
  id: string;
  name: string;
  status: VideoStatus;
  created_at: string;
  updated_at: string;
  preview: string;
}

export interface Video extends CollectionVideo {
  file: string;
}
