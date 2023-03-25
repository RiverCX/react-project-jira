import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "screens/project-list/project-list";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

// 使用react-query管理所有对projects的异步操作的状态

// 根据搜索参数获取项目列表
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // param 改变时，useQuery重新获取数据
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

// 获取单个项目
export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id, // id 为falsy值时不执行
    }
  );
};

// 编辑项目
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey) // 乐观更新配置
  );
};

// 添加项目
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey) // 乐观更新配置
  );
};

// 删除项目
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (id: number) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey) // 乐观更新配置
  );
};
