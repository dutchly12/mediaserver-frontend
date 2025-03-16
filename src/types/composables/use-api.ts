import type { AxiosResponse, isAxiosError } from 'axios';
import type {
  AuthenticationCreationRequest,
  AuthenticationCreationResponse,
  AuthenticationRefreshRequest,
} from '@/types/model/authentication.ts';
import type { User } from '@/types/model/user.ts';
import type { Collection, CollectionCreateData, ListCollection } from '@/types/model/collection.ts';
import type { ListVideo, ListVideoParams, Video, VideoCreateRequest } from '@/types/model/video.ts';
import type { Screenshot } from '@/types/model/screenshot.ts';

type Response<T> = Promise<AxiosResponse<T>>;

export interface Api {
  authentications: {
    create: (data: AuthenticationCreationRequest) => Response<AuthenticationCreationResponse>;
    refresh: (data: AuthenticationRefreshRequest) => Response<AuthenticationCreationResponse>;
    destroy: () => Response<void>;
  };
  user: {
    info: () => Response<User>;
  };
  collections: {
    list: () => Response<ListCollection[]>;
    one: (id: string) => Response<Collection>;
    create: (data: CollectionCreateData) => Response<Collection>;
  };
  videos: {
    list: (params?: ListVideoParams) => Response<ListVideo[]>;
    one: (id: string) => Response<Video>;
    screenshots: (id: string) => Response<Screenshot[]>;
    create: (data: VideoCreateRequest) => Response<Video>;
  };
  isAxiosError: typeof isAxiosError;
}
