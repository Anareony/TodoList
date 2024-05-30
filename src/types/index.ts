export enum Status {
  Completed = "completed",
  Active = "active",
}

export enum Filter {
  All = "all",
  Active = "active",
  Completed = "completed",
  Favourite = "favourite",
}

export interface TodoAttributes {
  title: string;
  description: string;
  status: Status;
}

export interface Todo {
  id: number;
  attributes: TodoAttributes;
}

export interface TodoProps {
  todo: Todo;
}

export interface Pagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}
