import { create } from "zustand";
import { persist } from "zustand/middleware";

interface postTodo {
  title: string;
  description: string;
  status: "completed" | "active";
}

export interface TodoProps {
  id: number;
  attributes: postTodo;
}

interface TodoState {
  todos: TodoProps[];
  error: unknown;
  getTodos: () => void;
  postTodo: (todo: postTodo) => void;
  editStatusTodo: (id: number, status: postTodo["status"]) => void;
  deleteTodo: (id: number) => void;
}

const accessToken =
  "a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed";

const BASE_URL = "https://cms.dev-land.host";

export const useTodosStore = create<TodoState>((set) => ({
  todos: [],
  error: null,
  getTodos: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "GET",
        headers: {
          Authorization: `bearer  + ${accessToken}`,
        },
      }).then((res) => res.json());

      set({ todos: response.data });
    } catch (error: unknown) {
      set({ error: error });
    } finally {
      console.log("work");
    }
  },
  postTodo: async (data) => {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer  + ${accessToken}`,
      },
      body: JSON.stringify({ data }),
    });
  },
  editStatusTodo: async (id, data) => {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer  + ${accessToken}`,
      },
      body: JSON.stringify({ data }),
    });
  },
  deleteTodo: async (id) => {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer  + ${accessToken}`,
      },
    });
  },
}));

interface Filters {
  filter: "all" | "active" | "completed";
  setFilter: (value: "all" | "active" | "completed") => void;
}

export const useFilter = create<Filters>((set) => ({
  filter: "all",
  setFilter: (value) => set({ filter: value }),
}));

interface TodoFavState {
  favTodos: TodoProps[];
  setFavTodos: (todo: TodoProps) => void;
  filterFavTodo: (todoId: TodoProps["id"]) => void;
  isFav: (todoId: TodoProps["id"]) => boolean;
}

export const useFavTodosStore = create<TodoFavState>()(
  persist(
    (set, get) => ({
      favTodos: [],
      setFavTodos: (todo) => set({ favTodos: [...get().favTodos, todo] }),
      filterFavTodo: (id) =>
        set({ favTodos: get().favTodos.filter((todoId) => todoId.id !== id) }),
      isFav: (id) => get().favTodos.some((todo) => todo.id === id),
    }),
    { name: "favTodos" }
  )
);
