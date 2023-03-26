import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useProjectTasks } from "./util";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: tasks } = useProjectTasks();
  const kanbanTasks = tasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      {kanbanTasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-right: 2rem;
`;
