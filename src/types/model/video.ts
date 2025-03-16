export enum VideoStatus {
  UNPROCESSED = 'unprocessed',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
}

export interface ListVideoParams {
  collection_id?: string;
}

export interface ListVideo {
  id: string;
  name: string;
  status: VideoStatus;
  created_at: string;
  updated_at: string;
  width: number | null;
  height: number | null;
  duration: number | null;
  preview: string | null;
}

export interface Video extends ListVideo {
  file: string;
}

export interface VideoCreateRequest {
  video: {
    name: string;
    collection_id: string;
    file: string;
  };
}
