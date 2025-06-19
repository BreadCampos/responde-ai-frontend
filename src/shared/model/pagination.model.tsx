export interface PaginationMeta {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  ignorePagination?: boolean;
  limit?: number;
  page?: number;
  pages?: number[];
  total?: number;
  totalPages?: number;
  search?: string;
  reloading?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: PaginationMeta;
}

export type DefaultPagination = {
  page?: number;
  limit?: number;
  ignorePagination?: boolean;
  reloading?: boolean;
  search?: string;
};
