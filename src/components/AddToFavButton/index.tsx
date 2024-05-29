import React from "react";

import { Button as AntdButton } from "antd";
import { StarFilled } from "@ant-design/icons";

import { useTodosStore } from "../../store";
import { TodoProps } from "../../types";
import styled from "styled-components";

interface isFav {
  $isfav: boolean;
}

const Icon = styled(StarFilled)<isFav>`
  font-size: 20px;
  color: ${({ $isfav }) => ($isfav ? "#fadb14" : "#83839c")};
`;

const Button = styled(AntdButton)`
  margin-left: auto;
  &:hover {
    background: none !important;
  }
`;

export const AddToFavButton: React.FC<TodoProps> = ({ todo }) => {
  const { setTodos, isFav, filterFavTodo } = useTodosStore((state) => ({
    isFav: state.isFav,
    setTodos: state.setFavTodos,
    filterFavTodo: state.filterFavTodo,
  }));

  const toggleFav = () => {
    if (isFav(todo.id)) {
      filterFavTodo(todo.id);
    } else {
      setTodos(todo);
    }
  };

  return (
    <Button type="text" onClick={toggleFav}>
      <Icon $isfav={isFav(todo.id)} />
    </Button>
  );
};
