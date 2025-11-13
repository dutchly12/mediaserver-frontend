import type { Tag } from '@/types/model/tag';
import type { Person } from '@/types/model/person';

export enum VideoStatus {
  UNPROCESSED = 'unprocessed',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
}

export interface ListVideoParams {
  unviewed?: boolean;
  person_ids?: string[];
  tag_ids?: string[];
  page?: number;
  limit?: number;
}

export interface ListVideo {
  id: string;
  name: string;
  width: number | null;
  height: number | null;
  duration: number | null;
  progress: number;
  viewed: boolean;
  preview: string | null;
  status: VideoStatus;
  created_at: string;
  updated_at: string;
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
    name?: string;
    person_ids?: string[];
    tag_ids?: string[];
  };
}

export interface VideoPreviewUpdateRequest {
  preview_id: string;
}

export interface VideoProgressUpdateRequest {
  progress: number;
}

export interface VideoProgressUpdateResponse {
  progress: number;
  viewed: boolean;
}

export interface RandomVideoId {
  id: string;
}
