import styled from "@emotion/styled";
import { Button, Dropdown } from "antd";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { useAuth } from "context/auth-context";
import { resetRoute } from "utils";
import { ButtonNoPadding, Row } from "./lib";
import { ProjectPopover } from "./project-popover";

export const PageHeader = () => {
  const { user, logout } = useAuth();
  return (
    <Container between={true}>
      <Row gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </Row>
      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              label: (
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              ),
            },
          ],
        }}
      >
        <Button type="link" onClick={(e) => e.preventDefault()}>
          Hi, {user?.name}
        </Button>
      </Dropdown>
    </Container>
  );
};

const Container = styled(Row)`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 3.2rem;
`;
