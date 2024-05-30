import { useState } from "react";
import styled from "styled-components";

import {
  Button as AntdButton,
  Flex,
  FloatButton as AntdFloatButton,
  Form,
  Input,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useTodosStore } from "../../store";
import { Status } from "../../types";

const { TextArea } = Input;

interface FieldType {
  title: string;
  description: string;
}

const Button = styled(AntdButton)`
  width: 100%;
  margin-top: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatButton = styled(AntdFloatButton)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const CreateTodoModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { postTodo } = useTodosStore((state) => ({
    postTodo: state.postTodo,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsDisabled(hasErrors);
  };

  const onFinish = async () => {
    form
      .validateFields()
      .then((data) => {
        postTodo({
          title: data.title,
          description: data.description,
          status: Status.Active,
        });
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  return (
    <>
      <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
        Create Todo
      </Button>
      <FloatButton onClick={showModal} type="primary" icon={<PlusOutlined />}>
        Create Todo
      </FloatButton>

      <Modal
        title="Create todo"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <Flex justify="center">
            <AntdButton key="back" type="text" onClick={handleCancel}>
              Cancel
            </AntdButton>
            <AntdButton
              key="submit"
              type="primary"
              htmlType="submit"
              disabled={isDisabled}
              onClick={() => onFinish()}
            >
              Add Task
            </AntdButton>
          </Flex>
        }
      >
        <Form autoComplete="off" form={form} onFieldsChange={handleFormChange}>
          <Form.Item<FieldType>
            name="title"
            rules={[{ required: true, message: "Please type your title!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item<FieldType>
            name="description"
            rules={[{ required: true, message: "Please type your description!" }]}
          >
            <TextArea placeholder="Description" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
