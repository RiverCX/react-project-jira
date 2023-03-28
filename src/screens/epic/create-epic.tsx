import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { ErrorBox } from "components/lib";
import { useEffect } from "react";
import { useCurrentProjectId } from "screens/kanban/util";
import { Epic } from "types/epic";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey } from "./utils";

export const CreateEpic = (props: { open: boolean; onClose: () => void }) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = Form.useForm();
  const projectId = useCurrentProjectId();
  const onFinish = (values: Partial<Epic>) => {
    addEpic({ ...values, projectId });
    props?.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.open]);

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      width="100%"
      forceRender={true}
      destroyOnClose={true}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
