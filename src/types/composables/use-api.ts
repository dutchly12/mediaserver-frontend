import type { AxiosResponse, isAxiosError } from 'axios';
import type {
  AuthenticationCreationRequest,
  AuthenticationCreationResponse,
  AuthenticationRefreshRequest,
} from '@/types/model/authentication.ts';
import type { User } from '@/types/model/user.ts';
import type { Collection, ListCollection } from '@/types/model/collection.ts';
import type { Video } from '@/types/model/video.ts';

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
  };
  videos: {
    one: (id: string) => Response<Video>;
  };
  isAxiosError: typeof isAxiosError;
}
