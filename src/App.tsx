import styled from "styled-components";

import { Layout as AntdLayout } from "antd";

import { CreateTodoModal } from "./components/CreateTodoModal";
import { FilterButtons } from "./components/FilterButtons";
import { TodoList } from "./components/TodoList";
import { Notification } from "./components/Notification";

const { Content: AntdContent, Sider: AntdSider } = AntdLayout;

const Layout = styled(AntdLayout)`
  height: 100vh;
  overflow-y: auto;
  background: #111214;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center;
    padding: 10px;
  }
`;

const Sider = styled(AntdSider)`
  height: fit-content;
  border-radius: 10px;
  background: transparent !important;
  margin-right: 20px;
  position: sticky !important;
  top: 0;
  @media (max-width: 768px) {
    position: relative !important;
    min-width: 100% !important;
    flex: unset !important;
    margin: 10px;
  }
`;

const Content = styled(AntdContent)`
  @media (max-width: 768px) {
    width: 100% !important;
  }
`;

function App() {
  return (
    <Layout>
      <Sider>
        <FilterButtons />
        <CreateTodoModal />
      </Sider>
      <Content>
        <TodoList />
      </Content>
      <Notification />
    </Layout>
  );
}

export default App;
