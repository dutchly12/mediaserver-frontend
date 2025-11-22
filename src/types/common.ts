export interface PaginationMeta {
  count: number;
  limit: number;
  page: number;
  pages: number;
}

export interface BaseBackendError {
  status: number;
  error: string;
  message: string;
}
