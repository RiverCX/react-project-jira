import styled from "@emotion/styled";
import { Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { LongButton } from "unauthenticated-app";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";

// 编辑、新建项目的模态框

export const ProjectModal = () => {
  const { isModalOpen, closeModal, isEditLoading, isEditing, editingProject } =
    useProjectModal();
  const queryKey = useProjectsQueryKey();
  const useMutateProject = isEditing ? useEditProject : useAddProject;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateProject(queryKey);

  const [form] = useForm();

  // 创建和编辑
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields(); // 清空表格数据
      closeModal();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      width="100%"
      open={isModalOpen}
      onClose={() => {
        form.resetFields();
        closeModal();
      }}
      forceRender={true}
    >
      <Container>
        {isEditLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{isEditing ? "编辑项目" : "创建项目"}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              onFinish={onFinish}
              style={{ width: "40rem" }}
              layout={"vertical"}
            >
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder="项目名" />
              </Form.Item>

              <Form.Item
                label="部门"
                name="organization"
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder="部门" />
              </Form.Item>

              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>

              <Form.Item>
                <LongButton
                  type="primary"
                  htmlType="submit"
                  loading={mutateLoading}
                >
                  提交
                </LongButton>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
