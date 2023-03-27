import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useKanbans } from "utils/kanban";
import { useProject } from "utils/project";
import { useTasks } from "utils/task";
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

export const useSearchTasks = () => {
  const [param, _] = useTasksSearchParams();
  return useTasks(param);
};

export const useTasksQueryKey = () => {
  const [param, _] = useTasksSearchParams();
  return ["tasks", param];
};
