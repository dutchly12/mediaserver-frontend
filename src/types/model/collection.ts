import type { CollectionVideo } from '@/types/model/video.ts';

export interface ListCollection {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Collection extends ListCollection {
  videos: CollectionVideo[];
}
