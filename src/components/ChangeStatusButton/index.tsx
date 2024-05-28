import React, { useEffect, useState } from "react";

import { TodoProps, useTodosStore } from "../../store";

import { Checkbox, CheckboxProps } from "antd";

interface Todo {
  todo: TodoProps;
}

export const ChangeStatusButton: React.FC<Todo> = ({ todo }) => {
  const { changeStatusTodo } = useTodosStore((state) => ({
    changeStatusTodo: state.changeStatusTodo,
  }));
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(todo.attributes.status === "completed" ? true : false);
  }, []);

  const onChange: CheckboxProps["onChange"] = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      changeStatusTodo(todo.id, { status: "completed" });
    } else {
      changeStatusTodo(todo.id, { status: "active" });
    }
  };

  return <Checkbox checked={checked} onChange={onChange} />;
};
