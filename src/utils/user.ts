import { useEffect } from "react";
import { QueryKey, useMutation, useQuery } from "react-query";
import { User } from "types/user";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

// 封装所有对users的异步操作

// 获取负组员列表
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};

// 添加组员
export const useAddUser = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<User>) =>
      client(`users`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey) // 乐观更新配置
  );
};
