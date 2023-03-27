import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "utils";
import { useKanbans } from "utils/kanban";
import { useProject } from "utils/project";
import { useTask, useTasks } from "utils/task";
import { useUrlQueryParam } from "utils/url";

// 项目ID和项目数据
export const useCurrentProjectId = () => {
  const { projectId } = useParams();
  return Number(projectId);
};

export const useCurrentProject = () => {
  return useProject(useCurrentProjectId());
};

// 看板数据、看板 QueryKey （用于乐观更新）
export const useProjectKanbans = () => {
  return useKanbans({ projectId: useCurrentProjectId() });
};

export const useKanbansQueryKey = () => {
  return ["kanbans", { projectId: useCurrentProjectId() }];
};

// 任务数据、搜索状态和 QueryKey（用于乐观更新）
export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useCurrentProjectId();
  return [
    useMemo(
      () => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name,
      }),
      [param, projectId]
    ),
    setParam,
  ] as const;
};

export const useSearchTasks = () => {
  const [param, _] = useTasksSearchParams();
  const debounceName = useDebounce(param.name, 200);
  return useTasks({ ...param, name: debounceName });
};

export const useTasksQueryKey = () => {
  const [param, _] = useTasksSearchParams();
  return ["tasks", param];
};

// 修改任务Modal的状态
export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  // task detail
  const { data: taskData, isLoading } = useTask(Number(editingTaskId));
  const openEditingModal = (id: number) => {
    setEditingTaskId({ editingTaskId: id });
  };
  const closeEditingModal = () => {
    setEditingTaskId({ editingTaskId: "" });
  };
  const isEditingModalOpen = !!editingTaskId;

  return {
    editingTaskId: Number(editingTaskId),
    taskData,
    isLoading,
    isEditingModalOpen,
    openEditingModal,
    closeEditingModal,
  };
};
