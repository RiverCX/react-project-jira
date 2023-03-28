import { useCurrentProjectId } from "screens/kanban/util";
import { useEpics } from "utils/epic";
import { useTasks } from "utils/task";

// 任务组数据、任务组 QueryKey （用于乐观更新）
export const useProjectEpics = () => {
  return useEpics({ projectId: useCurrentProjectId() });
};

export const useEpicsQueryKey = () => {
  return ["epics", { projectId: useCurrentProjectId() }];
};

export const useProjectTasks = () => {
  return useTasks({ projectId: useCurrentProjectId() });
};
