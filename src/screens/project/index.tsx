import styled from "@emotion/styled";
import { Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";

export const ProjectScreen = () => {
  return (
    <Container>
      <Aside>
        <Menu mode="inline">
          <Menu.Item>
            <NavLink to={"kanban"}>看板</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to={"epic"}>任务组</NavLink>
          </Menu.Item>
        </Menu>
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
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  padding: 3.2rem;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;
