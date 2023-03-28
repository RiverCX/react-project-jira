import styled from "@emotion/styled";
import { Spin } from "antd";
import { useCallback } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useProjectKanbans,
  useCurrentProject,
  useSearchTasks,
  useKanbansQueryKey,
  useTasksQueryKey,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useCurrentProject();
  const { data: kanbans, isLoading: kanbanLoading } = useProjectKanbans();
  const { isLoading: taskLoading } = useSearchTasks();
  const isLoading = kanbanLoading || taskLoading;
  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Droppable
              droppableId="kanban"
              type="COLUMN"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ display: "flex" }}
                >
                  {kanbans?.map((kanban, index) => (
                    <Draggable
                      key={kanban.id}
                      draggableId={"kanban" + kanban.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanColumn
                            kanban={kanban}
                            key={kanban.id}
                          ></KanbanColumn>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </Container>
    </DragDropContext>
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

/* 排序原理
看板和任务都是数组渲染，用index排序，当拖拽动作完成，返回的对象上有两个属性
source.index 拖拽的对象的在数组中的index
destination.index 拖拽的目标在数组中的index
可以根据以上参数持久化
*/

const useDragEnd = () => {
  const { data: kanbans } = useProjectKanbans();
  const { data: tasks } = useSearchTasks();

  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      console.log(source, destination);

      if (!destination) {
        return;
      }
      if (type === "COLUMN") {
        //看板排序
        const fromId = kanbans?.[source.index].id;
        const referenceId = kanbans?.[destination.index].id;
        if (!fromId || !referenceId || fromId === referenceId) return;
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId, type }); // 调用排序接口
      }

      if (type === "ROW") {
        // 任务排序
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        // 注意这里的index只是对应kanbanId下的index
        const fromId = tasks?.filter(
          (task) => task.kanbanId === fromKanbanId
        )?.[source.index]?.id;
        const referenceId = tasks?.filter(
          (task) => task.kanbanId === toKanbanId
        )?.[destination.index]?.id;

        if (fromId === referenceId) return;
        const type =
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before";
        reorderTask({ fromKanbanId, toKanbanId, fromId, referenceId, type });
      }
    },
    [kanbans, reorderKanban, tasks, reorderTask]
  );
};
