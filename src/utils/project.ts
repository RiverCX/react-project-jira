import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/project-list";
import { useHttp } from "./http";

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
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    { onSuccess: () => queryClient.invalidateQueries(["projects"]) } // 成功后刷新
  );
};

// 添加项目
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries(["projects"]) } // 成功后刷新
  );
};

// 删除项目
export const useDeleteProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    { onSuccess: () => queryClient.invalidateQueries(["projects"]) } // 成功后刷新
  );
};
