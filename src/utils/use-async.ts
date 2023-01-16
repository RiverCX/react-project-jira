import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

// 异步操作的状态管理Hook

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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  // 使用useState保存函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (
      // 传入异步操作的Promise
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

      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          // catch会消化掉异常
          setError(error);
          if (config.throwOnError) return Promise.reject(error); // 再抛出一个异常
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

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
