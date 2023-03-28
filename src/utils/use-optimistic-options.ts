// 乐观更新

import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";

// 返回useMutation的配置对象
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, oldData?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey), // 异步返回成功后更新键值对应的数据
    onMutate: (target: any) => {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData?: any) =>
        callback(target, oldData)
      ); // 函数式更新
      // 返回一个对象，可以在在mutate失败时回退使用
      return { previousItems };
    },
    onError: (error: any, variables: any, context: any) =>
      queryClient.setQueryData(queryKey, context.previousItems), // 回滚数据
  };
};

export const useDeleteConfig = (queryKey: QueryKey) => {
  return useConfig(
    queryKey,
    (target, oldData) => oldData?.filter((item) => item.id !== target) || []
  );
};

export const useAddConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, oldData) =>
    oldData ? [...oldData, target] : [target]
  );
};

export const useEditConfig = (queryKey: QueryKey) => {
  return useConfig(
    queryKey,
    (target, oldData) =>
      oldData?.map((item) =>
        target.id === item.id ? { ...item, ...target } : item
      ) || []
  );
};

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
