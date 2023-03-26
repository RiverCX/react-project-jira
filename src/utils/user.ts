import { useEffect } from "react";
import { User } from "types/user";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// 封装所有对users的异步操作

// 获取负责人列表
export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: param }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
