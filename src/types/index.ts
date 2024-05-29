type Status = "completed" | "active";

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
