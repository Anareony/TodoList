import { Layout as AntdLayout } from "antd";

import { CreateTodoModal } from "./components/CreateTodoModal";
import { FilterButtons } from "./components/FilterButtons";
import { TodoList } from "./components/TodoList";
import styled from "styled-components";

const { Content, Sider: AntdSider } = AntdLayout;

const Layout = styled(AntdLayout)`
  height: 100vh;
  overflow: auto;
  background: #111214;
  padding: 20px;
`;

const Sider = styled(AntdSider)`
  height: fit-content;
  border-radius: 10px;
  background: transparent !important;
  margin-right: 20px;
  position: sticky !important;
  top: 0;
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
    </Layout>
  );
}

export default App;
