import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

// 编辑、新建项目的模态框

export const ProjectModal = () => {
  const { isModalOpen, closeModal } = useProjectModal();
  return (
    <Drawer width="100%" open={isModalOpen} onClose={closeModal}>
      <h1>Project Modal</h1>
      <Button onClick={closeModal}>关闭</Button>
    </Drawer>
  );
};
