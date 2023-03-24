import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

// 定义一个一维排布的Flex容器
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

// 全屏幕容器
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Loading页面
export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
);

// 错误页面
export const FullPageErrorFallback = ({
  error,
}: {
  error: Error | null;
}): any => (
  <FullPage>
    <DevTools />
    <ErrorBox error={error} />
  </FullPage>
);

// padding为0的Button
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

const isError = (value: any): value is Error => {
  return value?.message;
};

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error))
    return <Typography.Text type="danger">{error.message}</Typography.Text>;
  return null;
};
