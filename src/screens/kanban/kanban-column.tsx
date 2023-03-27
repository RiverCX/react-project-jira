import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTaskTypes } from "utils/task-type";
import {
  useKanbansQueryKey,
  useSearchTasks,
  useTaskModal,
  useTasksSearchParams,
} from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import { Button, Card, Dropdown, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Row } from "components/lib";
import { useDeleteKanban } from "utils/kanban";
import { Mark } from "components/mark";

export const TaskTypeIcon = ({ typeId }: { typeId: number }) => {
  const { data: types } = useTaskTypes();
  const name = types?.find((type) => type.id === typeId)?.name;
  if (!name) return null;
  return <img src={name === "bug" ? bugIcon : taskIcon} alt={"task-icon"} />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { openEditingModal } = useTaskModal();
  const [param, _] = useTasksSearchParams();
  return (
    <Card
      key={task.id}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      onClick={() => openEditingModal(task.id)}
    >
      <p>
        <Mark str={task.name} keyword={param.name} />
      </p>
      <TaskTypeIcon typeId={task.typeId} />
    </Card>
  );
};

const More = ({ kanbanId }: { kanbanId: number }) => {
  const { mutate: deleteTask } = useDeleteKanban(useKanbansQueryKey());
  const menu = {
    items: [
      {
        label: (
          <Button
            type="link"
            onClick={() =>
              Modal.confirm({
                title: "确定删除看板吗",
                onOk: () => deleteTask(kanbanId),
                okText: "确认",
                cancelText: "取消",
              })
            }
          >
            删除
          </Button>
        ),
        key: "delete",
      },
    ],
  };
  return (
    <Dropdown menu={menu}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: tasks } = useSearchTasks();
  const kanbanTasks = tasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanbanId={kanban.id} />
      </Row>

      <TasksContainer>
        {kanbanTasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

export const Container = styled.div`
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
