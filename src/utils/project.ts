import { useEffect } from "react";
import { Project } from "screens/project-list/List";
import { cleanObj } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// 获取项目列表的请求
export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  const fetchProjects = () =>
    client("projects", { data: cleanObj(param || {}) });

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

// 编辑项目列表的请求
export const useEditProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();
  // 需要定义一个纯函数，因为Hook不能在JSX中调用
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return { mutate, ...result };
};

// t添加项目的请求
export const useAddProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();
  // 需要定义一个纯函数，因为Hook不能在JSX中调用
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return { mutate, ...result };
};
