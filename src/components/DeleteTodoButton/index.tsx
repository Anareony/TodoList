import { Button } from "antd";
import { useTodosStore } from "../../store";
import { DeleteFilled } from "@ant-design/icons";

export const DeleteTodoButton = ({ id }: { id: number }) => {
  const { deleteTodo } = useTodosStore((state) => ({
    deleteTodo: state.deleteTodo,
  }));

  return (
    <Button
      type="primary"
      danger
      onClick={() => deleteTodo(id)}
      style={{ marginLeft: "auto" }}
      icon={<DeleteFilled />}
    />
  );
};
