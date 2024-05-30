import { useEffect } from "react";

import { notification } from "antd";

import { useTodosStore } from "../../store";

export const Notification = () => {
  const { isSuccess } = useTodosStore((state) => ({
    isSuccess: state.isSuccess,
  }));
  const [api, contextHolder] = notification.useNotification();

  const openSuccessNotification = () => {
    api["success"]({
      message: "Success",
      description: "Task created.",
      duration: 5,
      placement: "bottomRight",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      openSuccessNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return <> {contextHolder}</>;
};
