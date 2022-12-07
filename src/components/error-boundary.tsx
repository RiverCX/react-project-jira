import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  { children: ReactNode; fallbackRender: FallbackRender },
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，该方法会接收到异常并执行，把error传给state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
