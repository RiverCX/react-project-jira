import styled from "@emotion/styled";
import { Popover, List, Typography, Divider } from "antd";
import { useUsers } from "utils/user";

// 用户的Popover组件

export const UserPopover = () => {
  const { data: users } = useUsers();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
