import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";

// 获取看板
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

// 添加看板
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey) // 乐观更新配置
  );
};

// 删除看板
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (id: number) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey) // 乐观更新配置
  );
};

export interface sortParam {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
}

// 看板排序
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: sortParam) =>
      client(`kanbans/reorder`, {
        method: "POST",
        data: param,
      }),
    useReorderKanbanConfig(queryKey)
  );
};
