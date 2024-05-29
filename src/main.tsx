import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";

const config: ThemeConfig = {
  token: {
    colorText: "#fff",
    colorTextDescription: "#b2b2b2",
    colorPrimary: "#682ee4",
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
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={config}>
    <App />
  </ConfigProvider>
);
