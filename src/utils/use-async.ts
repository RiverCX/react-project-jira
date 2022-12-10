import { useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  stat: "idle" | "loading" | "error" | "success";
  error: Error | null;
  data: D | null;
}

const defaultConfig = {
  throwOnError: false,
};

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

/*
所有通过异步请求获取的数据，都通过useAsync保存，代替useState
useAsync接受一个State对象初始化
run函数接受一个Promise实例，给Promise绑定回调函数，更新state
*/

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  // 使用useState保存函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // 传入异步操作的Promise
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }

    setRetry(() => () => {
      //  保存异步操作retry的操作
      if (runConfig?.retry) {
        // 调用run，调用异步操作函数
        run(runConfig?.retry(), runConfig);
      }
    });

    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current) setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // 被调用时，重新调用run
    retry,
    ...state,
  };
};
