import styled from "styled-components";

import { Button as AntdButton } from "antd";
import { StarFilled } from "@ant-design/icons";

import { useTodosStore } from "../../store";

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

export const AddToFavButton = ({ id }: { id: number }) => {
  const { setFavTodos, isFav, filterFavTodo } = useTodosStore((state) => ({
    isFav: state.isFav,
    setFavTodos: state.setFavTodos,
    filterFavTodo: state.filterFavTodo,
  }));

  const toggleFav = () => {
    if (isFav(id)) {
      filterFavTodo(id);
    } else {
      setFavTodos(id);
    }
  };

  return (
    <Button type="text" onClick={toggleFav} data-testid="toggleFav">
      <Icon $isfav={isFav(id)} data-testid="favIcon" />
    </Button>
  );
};
