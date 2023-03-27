import styled from "@emotion/styled";
import { Spin } from "antd";
import { useDocumentTitle } from "utils";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import { useProjectKanbans, useCurrentProject, useSearchTasks } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useCurrentProject();
  const { data: kanbans, isLoading: kanbanLoading } = useProjectKanbans();
  const { isLoading: taskLoading } = useSearchTasks();
  const isLoading = kanbanLoading || taskLoading;
  return (
    <Container>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  overflow-x: scroll;
`;
