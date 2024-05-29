import { Button as AntdButton, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useTodosStore } from "../../store";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { TextArea } = Input;

interface FieldType {
  title: string;
  description: string;
}

const Button = styled(AntdButton)`
  width: 100%;
  margin-top: 20px;
`;

export const CreateTodoModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { postTodo } = useTodosStore((state) => ({
    postTodo: state.postTodo,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    const data = form.getFieldsValue(["title", "description"]);
    postTodo({
      title: data.title,
      description: data.description,
      status: "active",
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
        Create Todo
      </Button>

      <Modal
        title="Create todo"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <>
            <Button key="back" type="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={() => onFinish()}
            >
              Add Task
            </Button>
          </>
        }
      >
        <Form autoComplete="off" form={form}>
          <Form.Item<FieldType>
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item<FieldType>
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea
              placeholder="Description"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
