import { useMemo } from "react";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜索的参数状态管理

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

// 当前搜索列表的QueryKey

export const useProjectsQueryKey = () => {
  const [param, _] = useProjectsSearchParams();
  return ["projects", param];
};

// 项目Modal的搜索参数状态管理

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ projectEditingId }, setProjectEditingId] = useUrlQueryParam([
    "projectEditingId",
  ]);

  // 获取project，创建项目时不执行
  const { data: editingProject, isLoading: isEditLoading } = useProject(
    Number(projectEditingId)
  );

  const openModal = () => setProjectCreate({ projectCreate: true });
  const openEditingModal = (id: number) =>
    setProjectEditingId({ projectEditingId: id });
  const closeModal = () => {
    editingProject
      ? setProjectEditingId({ projectEditingId: "" })
      : setProjectCreate({ projectCreate: "" });
  };

  return {
    isModalOpen: projectCreate === "true" || !!projectEditingId, // 从URL获取的参数都是string类型
    openModal,
    openEditingModal,
    closeModal,
    editingProject,
    isEditing: !!projectEditingId,
    isEditLoading,
  };
};
