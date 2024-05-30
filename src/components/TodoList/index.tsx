import { useEffect } from "react";
import styled from "styled-components";

import { Empty, Flex, Spin, Typography } from "antd";

import { useFilter, useTodosStore } from "../../store";
import { useInfiniteScroll } from "../../hooks";
import { Todo } from "../Todo";

const { Title: AntdTitle } = Typography;

const FlexContainer = styled(Flex)`
  min-width: 400px;
  background: #18171c;
  padding: 20px;
  border-radius: 10px;
  @media (max-width: 768px) {
    padding: 10px;
    min-width: 100%;
  }
`;

const Title = styled(AntdTitle)`
  align-self: start;
  margin: 0;
`;

export const TodoList = () => {
  const { getTodos, pagination, isLoading } = useTodosStore((state) => ({
    getTodos: state.getTodos,
    pagination: state.pagination,
    isLoading: state.isLoading,
  }));

  const { filter } = useFilter((state) => ({
    filter: state.filter,
  }));

  const todos = useTodosStore((state) => {
    switch (filter) {
      case "completed":
        return state.todos.filter((todo) => todo.attributes.status === "completed");
      case "active":
        return state.todos.filter((todo) => todo.attributes.status === "active");
      case "favourite":
        return state.todos.filter((todo) => state.favTodos.find((id) => todo.id === id));
      default:
        return state.todos;
    }
  });

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    const hasMore =
      pagination.pageCount > pagination.page && pagination.total >= pagination.pageSize;
    console.log(!isLoading && hasMore);
    if (!isLoading && hasMore) {
      getTodos();
    }
  };

  const infiniteScrollRef = useInfiniteScroll(loadMore);

  return (
    <FlexContainer vertical gap={10}>
      <Title level={2}>Tasks</Title>
      {todos.length || isLoading ? (
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <Empty />
      )}
      <div ref={infiniteScrollRef}></div>
      {isLoading && <Spin size="large" />}
    </FlexContainer>
  );
};
