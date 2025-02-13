import type { AxiosResponse, isAxiosError } from 'axios';
import type {
  AuthenticationCreationRequest,
  AuthenticationCreationResponse,
  AuthenticationRefreshRequest,
} from '@/types/model/authentication.ts';
import type { User } from '@/types/model/user.ts';

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
  isAxiosError: typeof isAxiosError;
}
