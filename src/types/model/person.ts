export interface Person {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PersonCreateRequestData {
  person: {
    name: string;
  };
}

export type PersonUpdateRequestData = PersonCreateRequestData;
