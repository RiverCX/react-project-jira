import { Button, Form, Input, Modal, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypeSelect } from "components/type-select";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskModal, useTasksQueryKey } from "./util";

export const TaskModal = () => {
  const {
    editingTaskId,
    taskData,
    isLoading,
    isEditingModalOpen,
    closeEditingModal,
  } = useTaskModal();

  const { mutateAsync: deleteTask, isLoading: deleteLoading } = useDeleteTask(
    useTasksQueryKey()
  );
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(taskData);
  }, [taskData, form]);

  const onCancel = () => {
    closeEditingModal();
    form.resetFields();
  };

  const onOk = () => {
    editTask({ ...taskData, ...form.getFieldsValue() });
    closeEditingModal();
  };

  const onDelete = () => {
    closeEditingModal();
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除任务吗",
      onOk() {
        return deleteTask(editingTaskId);
      },
    });
  };

  return (
    <Modal
      open={isEditingModalOpen}
      title="编辑任务"
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <Form {...layout} form={form} layout="vertical">
            <Form.Item
              label="任务名"
              name="name"
              rules={[{ required: true, message: "请输入任务名" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="经办人" name="processorId">
              <UserSelect defaultOptionName="经办人" />
            </Form.Item>
            <Form.Item label="类型" name="typeId">
              <TaskTypeSelect />
            </Form.Item>
          </Form>

          <div style={{ textAlign: "right" }}>
            <Button
              danger
              onClick={onDelete}
              loading={deleteLoading}
              size="small"
              style={{ fontSize: "12px" }}
            >
              删除
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
