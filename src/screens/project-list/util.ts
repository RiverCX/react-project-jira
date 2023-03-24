import { useMemo } from "react";
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

// 项目Modal搜索的参数状态管理

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const openModal = () => setProjectCreate({ projectCreate: true });
  const closeModal = () => setProjectCreate({ projectCreate: undefined });

  return {
    isModalOpen: projectCreate === "true", // 从URL获取的参数都是string类型
    openModal,
    closeModal,
  };
};
