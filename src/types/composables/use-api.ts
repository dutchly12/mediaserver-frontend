import type { AxiosResponse, isAxiosError } from 'axios';
import type {
  Authentication,
  AuthenticationCreationRequest,
  AuthenticationCreationResponse,
  AuthenticationRefreshRequest,
} from '@/types/model/authentication';
import type { User } from '@/types/model/user';
import type {
  ListVideo,
  ListVideoParams,
  RandomVideoId,
  Video,
  VideoCreateRequest,
  VideoPreviewUpdateRequest,
  VideoProgressUpdateRequest,
  VideoProgressUpdateResponse,
  VideoUpdateRequest,
} from '@/types/model/video';
import type { Screenshot } from '@/types/model/screenshot';
import type {
  Person,
  PersonCreateRequestData,
  PersonUpdateRequestData,
} from '@/types/model/person';
import type { Tag, TagCreateRequestData, TagUpdateRequestData } from '@/types/model/tag';
import type { PaginationMeta } from '@/types/common';

interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

type Response<T> = Promise<AxiosResponse<T>>;
type PaginatedResponse<T> = Promise<AxiosResponse<PaginatedData<T>>>;

export interface Api {
  authentications: {
    list: () => Response<Authentication[]>;
    refresh: (data: AuthenticationRefreshRequest) => Response<AuthenticationCreationResponse>;
    destroy: () => Response<void>;
    base: {
      create: (data: AuthenticationCreationRequest) => Response<AuthenticationCreationResponse>;
    };
    passkey: {
      options: () => Response<PublicKeyCredentialRequestOptionsJSON>;
      create: (data: PublicKeyCredentialJSON) => Response<AuthenticationCreationResponse>;
    };
  };
  passkey: {
    options: () => Response<PublicKeyCredentialCreationOptionsJSON>;
    store: (data: PublicKeyCredentialJSON) => Response<void>;
  };
  people: {
    list: () => Response<Person[]>;
    one: (id: string) => Response<Person>;
    create: (data: PersonCreateRequestData | FormData) => Response<Person>;
    update: (id: string, data: PersonUpdateRequestData | FormData) => Response<Person>;
  };
  tags: {
    list: () => Response<Tag[]>;
    one: (id: string) => Response<Tag>;
    create: (data: TagCreateRequestData) => Response<Tag>;
    update: (id: string, data: TagUpdateRequestData) => Response<Tag>;
  };
  user: {
    info: () => Response<User>;
  };
  videos: {
    list: (params?: ListVideoParams) => PaginatedResponse<ListVideo>;
    one: (id: string) => Response<Video>;
    random: () => Response<RandomVideoId>;
    update: (id: string, data: VideoUpdateRequest) => Response<Video>;
    update_preview: (id: string, data: VideoPreviewUpdateRequest) => Response<Screenshot[]>;
    update_progress: (
      id: string,
      data: VideoProgressUpdateRequest,
    ) => Response<VideoProgressUpdateResponse>;
    screenshots: (id: string) => Response<Screenshot[]>;
    create: (data: VideoCreateRequest) => Response<Video>;
  };
  isAxiosError: typeof isAxiosError;
}
