export enum VideoStatus {
  UNPROCESSED = 'unprocessed',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
}

export interface ListVideoParams {
  person_id?: string;
  page?: number;
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
    file: string;
  };
}
