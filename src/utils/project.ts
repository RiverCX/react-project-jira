import { useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { Project } from "screens/project-list/project-list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// 封装所有对projects的异步操作

// 获取项目列表
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // param 改变时，useQuery重新获取数据
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

// 编辑项目列表
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

// 添加项目
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

// 删除项目
export const useDeleteProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "DELETE",
      })
    );
  };
  return { mutate, ...result };
};
