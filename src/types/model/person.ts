export interface Person {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  picture?: string;
}

export interface PersonCreateRequestData {
  person: {
    name: string;
    picture?: File;
  };
}

export type PersonUpdateRequestData = PersonCreateRequestData;
