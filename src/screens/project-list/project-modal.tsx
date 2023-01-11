import { Button, Drawer } from "antd";

// 编辑、新建项目的模态框

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer width="100%" open={props.projectModalOpen} onClose={props.onClose}>
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
