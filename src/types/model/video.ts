import type { Tag } from '@/types/model/tag.ts';
import type { Person } from '@/types/model/person.ts';

export enum VideoStatus {
  UNPROCESSED = 'unprocessed',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
}

export interface ListVideoParams {
  person_id?: string;
  page?: number;
  limit?: number;
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
  tags: Tag[];
  people: Person[];
}

export interface VideoCreateRequest {
  video: {
    name: string;
    file: string;
  };
}

export interface VideoUpdateRequest {
  video: {
    name: string;
  };
}

export interface VideoPreviewUpdateRequest {
  preview_id: string;
}
