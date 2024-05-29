import React from "react";

import { DeleteTodoButton } from "../DeleteTodoButton";
import { ChangeStatusButton } from "../ChangeStatusButton";
import { Divider, Flex, Typography } from "antd";
import { AddToFavButton } from "../AddToFavButton";
import { TodoProps } from "../../types";
import { styled } from "styled-components";

const { Text, Title: AntdTitle } = Typography;

const FlexContainer = styled(Flex)`
  background: #2e2d35;
  padding: 10px 15px;
  border-radius: 10px;
`;

const Title = styled(AntdTitle)`
  margin: 0;
`;

const TextContainer = styled(Flex)`
  max-width: 70%;
`;

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <>
      <FlexContainer align="center" gap={15}>
        <ChangeStatusButton todo={todo} />
        <TextContainer vertical>
          <Title level={5}>{todo.attributes.title}</Title>
          <Text type="secondary">{todo.attributes.description}</Text>
        </TextContainer>
        <AddToFavButton todo={todo} />
        <DeleteTodoButton id={todo.id} />
      </FlexContainer>
      <Divider />
    </>
  );
};
