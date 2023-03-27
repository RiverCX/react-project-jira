import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useKanbans } from "utils/kanban";
import { useProject } from "utils/project";
import { useTasks } from "utils/task";
import { useUrlQueryParam } from "utils/url";

export const useCurrentProjectId = () => {
  const { projectId } = useParams();
  return Number(projectId);
};

// 返回当前项目数据、项目的看板

export const useCurrentProject = () => {
  return useProject(useCurrentProjectId());
};

export const useProjectKanbans = () => {
  return useKanbans({ projectId: useCurrentProjectId() });
};

// 根据搜索返回任务数据

export const useSearchTasks = () => {
  const [param, _] = useTasksSearchParams();
  return useTasks(param);
};

// 搜索任务的状态 和 queryKey

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
        ...param,
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name,
      }),
      [param, useCurrentProjectId]
    ),
    setParam,
  ] as const;
};

export const useTasksQueryKey = () => {
  const [param, _] = useTasksSearchParams();
  return ["tasks", param];
};
