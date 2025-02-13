import 'vue-router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'authentication' | 'default';
    authentication?: true;
    protected?: true;
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    __noRefresh?: true;
    __refreshed?: true;
  }
}
