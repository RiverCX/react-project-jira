import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useProjectKanbans, useCurrentProject } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useCurrentProject();
  const { data: kanbans } = useProjectKanbans();
  return (
    <Container>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>
        ))}
      </ColumnsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2 rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;
