export interface ListCollection {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export type Collection = ListCollection;

export interface CollectionCreateData {
  collection: {
    name: string;
  };
}
