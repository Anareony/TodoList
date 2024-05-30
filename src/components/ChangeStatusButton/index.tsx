import React, { useEffect, useState } from "react";

import { Checkbox, CheckboxProps } from "antd";

import { useTodosStore } from "../../store";
import { Status, Todo, TodoProps } from "../../types";

export const ChangeStatusButton: React.FC<TodoProps> = ({ todo }) => {
  const { changeStatusTodo } = useTodosStore((state) => ({
    changeStatusTodo: state.changeStatusTodo,
  }));
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = (todo: Todo) => {
    setChecked(todo.attributes.status === Status.Completed ? true : false);
  };

  useEffect(() => {
    toggleCheckbox(todo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange: CheckboxProps["onChange"] = (e) => {
    if (e.target.checked) {
      changeStatusTodo(todo.id, { status: Status.Completed }).then((data) => {
        toggleCheckbox(data);
      });
    } else {
      changeStatusTodo(todo.id, { status: Status.Active }).then((data) => {
        toggleCheckbox(data);
      });
    }
  };

  return <Checkbox checked={checked} onChange={onChange} />;
};
