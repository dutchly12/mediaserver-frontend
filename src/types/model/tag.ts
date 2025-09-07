export interface Tag {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TagCreateRequestData {
  tag: {
    name: string;
  };
}

export type TagUpdateRequestData = TagCreateRequestData;
