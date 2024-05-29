import axios from "axios";
import { TodoAttributes } from "../types";

const accessToken =
  "a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed";

const BASE_URL = "https://cms.dev-land.host";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer  + ${accessToken}`,
  },
});

export const getTodos = (page: number) => {
  return instance.get("/api/tasks", {
    params: {
      pagination: {
        page: page,
        pageSize: 10,
      },
    },
  });
};

export const postTodo = (data: TodoAttributes) => {
  return instance.post("/api/tasks", JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const changeStatusTodo = (
  id: number,
  data: { status: TodoAttributes["status"] }
) => {
  return instance.put(`/api/tasks/${id}`, JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteTodo = (id: number) => {
  return instance.delete(`/api/tasks/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
};
