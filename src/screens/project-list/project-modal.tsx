import { Button, Drawer } from "antd";

// 编辑、新建项目的模态框

export const ProjectModal = () => {
  return (
    <Drawer width="100%" open={false} onClose={() => {}}>
      <h1>Project Modal</h1>
      <Button onClick={() => {}}>关闭</Button>
    </Drawer>
  );
};
