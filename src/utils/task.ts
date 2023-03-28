import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { sortParam } from "./kanban";
import {
  useEditConfig,
  useAddConfig,
  useDeleteConfig,
} from "./use-optimistic-options";

// 获取任务列表
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

// 获取单个任务
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: !!id, // id 为falsy值时不执行
  });
};

// 编辑任务
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey) // 乐观更新配置
  );
};

// 添加任务
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey) // 乐观更新配置
  );
};

// 删除任务
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (id: number) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey) // 乐观更新配置
  );
};

// 任务排序
interface sortTaskParam extends sortParam {
  fromKanbanId: number;
  toKanbanId: number;
}

export const useReorderTask = () => {
  const client = useHttp();

  return useMutation((param: sortTaskParam) =>
    client(`tasks/reorder`, {
      method: "POST",
      data: param,
    })
  );
};
