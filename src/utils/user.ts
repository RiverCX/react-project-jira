import { useEffect } from "react";
import { User } from "screens/project-list/SearchPanel";
import { cleanObj } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: cleanObj(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
