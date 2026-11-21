/** One page of a list, as the paged admin endpoints answer. */
export interface AdminPage<T> {
  data: T[];
  totalRecordSize: number;
}
