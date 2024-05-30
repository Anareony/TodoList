import { create } from "zustand";
import { persist } from "zustand/middleware";
import { changeStatusTodo, deleteTodo, getTodos, postTodo } from "../api";
import { Filter, Pagination, Todo, TodoAttributes } from "../types";

interface TodoState {
  todos: Todo[];
  favTodos: Todo["id"][];
  pagination: Pagination;
  isLoading: boolean;
  isSuccess: boolean;
  error: unknown;
  currentPage: number;
  getTodos: () => Promise<void>;
  postTodo: (todo: TodoAttributes) => Promise<void>;
  changeStatusTodo: (
    id: number,
    { status }: { status: TodoAttributes["status"] }
  ) => Promise<Todo>;
  deleteTodo: (todoId: Todo["id"]) => Promise<void>;
  setFavTodos: (todo: Todo["id"]) => void;
  filterFavTodo: (todoId: Todo["id"]) => void;
  isFav: (todoId: Todo["id"]) => boolean;
}

export const useTodosStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      favTodos: [],
      pagination: {} as Pagination,
      error: null,
      isLoading: false,
      isSuccess: false,
      currentPage: 0,

      getTodos: async () => {
        set({ currentPage: get().currentPage + 1 });
        try {
          set({ isLoading: true });
          const response = await getTodos(get().currentPage);
          if (response.status === 200) {
            const body = response.data;
            set(() => ({
              todos: [...get().todos, ...body.data],
              pagination: body.meta.pagination,
            }));
          }
        } catch (error: unknown) {
          set({ error: error });
        } finally {
          set({ isLoading: false });
        }
      },

      postTodo: async (data) => {
        try {
          const response = await postTodo(data);
          if (response.status === 200) {
            set({ isSuccess: true });

            const pagination = get().pagination;
            const isBottomPage =
              pagination.page * pagination.pageSize >= pagination.total;

            const body = response.data;

            if (pagination.pageSize >= pagination.total && isBottomPage) {
              set({ todos: [body.data, ...get().todos] });
            }
          }
        } catch (error: unknown) {
          set({ error: error });
        } finally {
          set({ isSuccess: false });
        }
      },

      changeStatusTodo: async (id, data) => {
        try {
          const response = await changeStatusTodo(id, data);
          if (response.status === 200) {
            return response.data.data;
          }
        } catch (error: unknown) {
          set({ error: error });
        }
      },

      deleteTodo: async (id) => {
        try {
          const response = await deleteTodo(id);
          if (response.status === 200) {
            set({ todos: get().todos.filter((todoId) => todoId.id !== id) });
            get().filterFavTodo(id);
          }
        } catch (error: unknown) {
          set({ error: error });
        }
      },

      setFavTodos: (todoId) => set({ favTodos: [...get().favTodos, todoId] }),

      filterFavTodo: (id) =>
        set({ favTodos: get().favTodos.filter((todoId) => todoId !== id) }),

      isFav: (id) => get().favTodos.some((todoId) => todoId === id),
    }),
    {
      name: "favTodos",
      partialize: (state) => ({ favTodos: state.favTodos }),
    }
  )
);

interface Filters {
  filter: Filter;
  setFilter: (value: Filter) => void;
}

export const useFilter = create<Filters>((set) => ({
  filter: Filter.All,
  setFilter: (value) => set({ filter: value }),
}));
