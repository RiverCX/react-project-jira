import List from "./List";
import SearchPanel from "./SearchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  // 搜索参数
  const [param, setParam] = useProjectsSearchParams();
  // 负责人列表
  const { data: users } = useUsers();
  // 任务列表
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
