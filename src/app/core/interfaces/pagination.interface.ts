export interface Pagination {
  page: number,
  take: number,
}

export interface PaginableResponse<T> {
  data: T,
  pageCount: number,
}