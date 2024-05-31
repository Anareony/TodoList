import styled from "styled-components";

import { Button as AntdButton, Popconfirm, PopconfirmProps } from "antd";
import { DeleteFilled } from "@ant-design/icons";

import { useTodosStore } from "../../store";

const Button = styled(AntdButton)`
  min-width: 32px;
`;

export const DeleteTodoButton = ({ id }: { id: number }) => {
  const { deleteTodo } = useTodosStore((state) => ({
    deleteTodo: state.deleteTodo,
  }));

  const confirm: PopconfirmProps["onConfirm"] = () => {
    deleteTodo(id);
  };

  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
      aria-label="popconfirm"
    >
      <Button
        type="primary"
        danger
        icon={<DeleteFilled />}
        data-testid="delete"
      />
    </Popconfirm>
  );
};
