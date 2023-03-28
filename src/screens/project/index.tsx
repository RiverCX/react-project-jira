import styled from "@emotion/styled";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const ProjectScreen = () => {
  // 控制导航栏高亮
  const [selectedKeys, setSelectedKeys] = useState(["kanban"]);
  let location = useLocation();

  useEffect(() => {
    const key = location.pathname.split("/")[3] || "kanban";
    setSelectedKeys([key]);
  }, [location]);

  return (
    <Container>
      <Aside>
        <Menu
          mode="inline"
          items={[
            {
              key: "kanban",
              label: <NavLink to={"kanban"}>看板</NavLink>,
            },
            {
              key: "epic",
              label: <NavLink to={"epic"}>任务组</NavLink>,
            },
          ]}
          selectedKeys={selectedKeys}
          onSelect={({ key }) => setSelectedKeys([key])}
        />
      </Aside>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
