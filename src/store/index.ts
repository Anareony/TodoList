import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { changeStatusTodo, deleteTodo, getTodos, postTodo } from "../api";
import { Pagination, Todo, TodoAttributes } from "../types";

interface TodoState {
  todos: Todo[];
  favTodos: Todo[];
  pagination: Pagination;
  loading: boolean;
  error: unknown;
  getTodos: (page: number) => void;
  postTodo: (todo: TodoAttributes) => void;
  changeStatusTodo: (
    id: number,
    { status }: { status: TodoAttributes["status"] }
  ) => void;
  deleteTodo: (todoId: Todo["id"]) => void;
  setFavTodos: (todo: Todo) => void;
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
      loading: false,
      getTodos: async (page) => {
        set({ loading: true });
        try {
          const response = await getTodos(page);
          if (response.status === 200) {
            const body = await response.data;
            set({ todos: [...get().todos, ...body.data] });
            set({ pagination: body.meta.pagination });
          }
        } catch (error: unknown) {
          set({ error: error });
        } finally {
          set({ loading: false });
        }
      },
      postTodo: async (data) => {
        const response = await postTodo(data);
        const body = await response.data;
        console.log(body);
        // set({ todos: [response.data, ...get().todos] });
      },
      changeStatusTodo: async (id, data) => {
        const response = await changeStatusTodo(id, data);
        // const body = await response.data;
      },
      deleteTodo: async (id) => {
        const response = await deleteTodo(id);
        if (response.status === 200) {
          set({ todos: get().todos.filter((todoId) => todoId.id !== id) });
          set({
            favTodos: get().favTodos.filter((todoId) => todoId.id !== id),
          });
        }
      },
      setFavTodos: (todo) => set({ favTodos: [...get().favTodos, todo] }),
      filterFavTodo: (id) =>
        set({ favTodos: get().favTodos.filter((todoId) => todoId.id !== id) }),
      isFav: (id) => get().favTodos.some((todo) => todo.id === id),
    }),
    {
      name: "favTodos",
      partialize: (state) => ({ favTodos: state.favTodos }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type Filter = "all" | "active" | "completed" | "favourite";

interface Filters {
  filter: Filter;
  setFilter: (value: Filter) => void;
}

export const useFilter = create<Filters>((set) => ({
  filter: "all",
  setFilter: (value) => set({ filter: value }),
}));
