import React from "react";

import { ConfigProvider, ThemeConfig } from "antd";

const config: ThemeConfig = {
  token: {
    colorText: "#fff",
    colorTextDescription: "#b2b2b2",
    colorPrimary: "#682ee4",
    colorIcon: "#fff",
    colorBgElevated: "#18171c",
  },
  components: {
    Checkbox: {
      controlInteractiveSize: 20,
      borderRadiusSM: 10,
      colorBgContainer: "tranparent",
      lineWidth: 2,
    },
    Button: {
      fontWeight: 600,
      defaultColor: "#fff",
      defaultBg: "#682ee4",
      defaultHoverBg: "#7562fc",
      defaultHoverColor: "#fff",
      defaultActiveBg: "#682ee4",
      defaultActiveColor: "#fff",
      defaultBorderColor: "transparent",
      colorTextDisabled: "#fff",
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Divider: {
      marginLG: 0,
    },
    Modal: {
      titleColor: "#fff",
      headerBg: "#18171c",
      contentBg: "#18171c",
    },
    Input: {
      colorBgContainer: "#18171c",
      colorText: "#fff",
      colorTextPlaceholder: "#ccc",
      colorIcon: "#fff",
    },
    Notification: {
      colorBgElevated: "#18171c",
      colorBgContainer: "#18171c",
    },
  },
};

interface ProvidersProps {
  readonly children: JSX.Element;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};
