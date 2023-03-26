import { useParams } from "react-router-dom";
import { useKanbans } from "utils/kanban";
import { useProject } from "utils/project";
import { useTasks } from "utils/task";

export const useCurrentProjectId = () => {
  const { projectId } = useParams();
  return Number(projectId);
};

// 返回当前项目数据、项目的看板和任务数据

export const useCurrentProject = () => {
  return useProject(useCurrentProjectId());
};

export const useProjectTasks = () => {
  return useTasks({ projectId: useCurrentProjectId() });
};

export const useProjectKanbans = () => {
  return useKanbans({ projectId: useCurrentProjectId() });
};
