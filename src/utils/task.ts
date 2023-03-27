import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import {
  useEditConfig,
  useAddConfig,
  useDeleteConfig,
} from "./use-optimistic-options";

// 获取任务
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
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
