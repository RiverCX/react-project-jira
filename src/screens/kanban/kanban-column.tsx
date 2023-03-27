import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTaskTypes } from "utils/task-type";
import { useSearchTasks } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import { Card } from "antd";

export const TaskTypeIcon = ({ typeId }: { typeId: number }) => {
  const { data: types } = useTaskTypes();
  const name = types?.find((type) => type.id === typeId)?.name;
  if (!name) return null;
  return <img src={name === "bug" ? bugIcon : taskIcon} />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: tasks } = useSearchTasks();
  const kanbanTasks = tasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {kanbanTasks?.map((task) => (
          <Card key={task.id} style={{ marginBottom: "0.5rem" }}>
            <div>{task.name}</div>
            <TaskTypeIcon typeId={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  padding: 0.7rem 0.7rem 1rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
