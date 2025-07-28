import type { AxiosResponse, isAxiosError } from 'axios';
import type {
  AuthenticationCreationRequest,
  AuthenticationCreationResponse,
  AuthenticationRefreshRequest,
} from '@/types/model/authentication.ts';
import type { User } from '@/types/model/user.ts';
import type { ListVideo, ListVideoParams, Video, VideoCreateRequest } from '@/types/model/video.ts';
import type { Screenshot } from '@/types/model/screenshot.ts';
import type { Person } from '@/types/model/person.ts';
import type { Tag } from '@/types/model/tag.ts';

type Response<T> = Promise<AxiosResponse<T>>;

export interface Api {
  authentications: {
    create: (data: AuthenticationCreationRequest) => Response<AuthenticationCreationResponse>;
    refresh: (data: AuthenticationRefreshRequest) => Response<AuthenticationCreationResponse>;
    destroy: () => Response<void>;
  };
  people: {
    list: () => Response<Person[]>;
  };
  tags: {
    list: () => Response<Tag[]>;
  };
  user: {
    info: () => Response<User>;
  };
  videos: {
    list: (params?: ListVideoParams) => Response<ListVideo[]>;
    one: (id: string) => Response<Video>;
    screenshots: (id: string) => Response<Screenshot[]>;
    create: (data: VideoCreateRequest) => Response<Video>;
  };
  isAxiosError: typeof isAxiosError;
}
