import styled from "@emotion/styled";
import { Button, List, Modal } from "antd";
import { Row } from "components/lib";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentProject, useCurrentProjectId } from "screens/kanban/util";
import { useDeleteEpic } from "utils/epic";
import { CreateEpic } from "./create-epic";
import { useEpicsQueryKey, useProjectEpics, useProjectTasks } from "./utils";

export const EpicScreen = () => {
  const projectId = useCurrentProjectId();
  const { data: project } = useCurrentProject();
  const { data: epics } = useProjectEpics();
  const { data: tasks } = useProjectTasks();
  const { mutate: deleteMutate } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  return (
    <Container>
      <Row between={true}>
        <h1>{project?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>

      <List
        dataSource={epics}
        itemLayout="vertical"
        style={{ overflow: "scroll" }}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button
                    type="link"
                    onClick={() =>
                      Modal.confirm({
                        title: "确定删除任务组吗",
                        okText: "确认",
                        cancelText: "取消",
                        onOk: () => deleteMutate(epic.id),
                      })
                    }
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <div key={task.id}>
                    <Link
                      to={`/projects/${projectId}/kanban?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  </div>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        open={epicCreateOpen}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
