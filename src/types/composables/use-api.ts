import type { AxiosResponse, isAxiosError } from 'axios';
import type {
  AuthenticationCreationRequest,
  AuthenticationCreationResponse,
  AuthenticationRefreshRequest,
} from '@/types/model/authentication.ts';
import type { User } from '@/types/model/user.ts';
import type {
  ListVideo,
  ListVideoParams,
  Video,
  VideoCreateRequest,
  VideoPreviewUpdateRequest,
  VideoUpdateRequest,
} from '@/types/model/video.ts';
import type { Screenshot } from '@/types/model/screenshot.ts';
import type { Person } from '@/types/model/person.ts';
import type { Tag } from '@/types/model/tag.ts';
import type { PaginationMeta } from '@/types/common.ts';

interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

type Response<T> = Promise<AxiosResponse<T>>;
type PaginatedResponse<T> = Promise<AxiosResponse<PaginatedData<T>>>;

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
    list: (params?: ListVideoParams) => PaginatedResponse<ListVideo>;
    one: (id: string) => Response<Video>;
    update: (id: string, data: VideoUpdateRequest) => Response<Video>;
    update_preview: (id: string, data: VideoPreviewUpdateRequest) => Response<Screenshot[]>;
    screenshots: (id: string) => Response<Screenshot[]>;
    create: (data: VideoCreateRequest) => Response<Video>;
  };
  isAxiosError: typeof isAxiosError;
}
