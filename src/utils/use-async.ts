import { useState } from "react";

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
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
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
    ...state,
  };
};