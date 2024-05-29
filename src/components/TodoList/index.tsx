import { Flex, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useFilter, useTodosStore } from "../../store";
import { useInfiniteScroll } from "../../hooks";
import { Todo } from "../Todo";
import styled from "styled-components";

const { Title: AntdTitle } = Typography;

const FlexContainer = styled(Flex)`
  min-width: 400px;
  background: #18171c;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled(AntdTitle)`
  align-self: start;
  margin: 0;
`;

export const TodoList = () => {
  const { getTodos, pagination, isLoading } = useTodosStore((state) => ({
    getTodos: state.getTodos,
    pagination: state.pagination,
    isLoading: state.loading,
  }));

  const { filter } = useFilter((state) => ({
    filter: state.filter,
  }));

  const todos = useTodosStore((state) => {
    switch (filter) {
      case "completed":
        return state.todos.filter(
          (todo) => todo.attributes.status === "completed"
        );
      case "active":
        return state.todos.filter(
          (todo) => todo.attributes.status === "active"
        );
      case "favourite":
        return state.favTodos;
      default:
        return state.todos;
    }
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    getTodos(page);
    setPage((prev) => prev + 1);
  }, []);

  const loadMore = () => {
    const isNotLastPage =
      pagination.pageCount >= page && pagination.total > pagination.pageSize;
    if (!isLoading && isNotLastPage) {
      getTodos(page);
      setPage((prev) => prev + 1);
    }
  };

  const infiniteScrollRef = useInfiniteScroll(loadMore);

  return (
    <FlexContainer vertical gap={10}>
      <Title level={2}>Tasks</Title>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <div ref={infiniteScrollRef}></div>
      {isLoading && <Spin size="large" />}
    </FlexContainer>
  );
};
