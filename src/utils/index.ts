import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

// typescript的object范围很广，不仅是字典对象，因此不能直接使用object
export const cleanObj = (obj: { [key: string]: unknown }) => {
  if (!Object) return {};
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) delete result[key];
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 加上callback依赖项会无限循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const debounce = (callback: () => void, delay: number) => {
  let timeout;
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => callback(), delay);
};

export const useDebounce = <V>(value: V, delay?: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [title, oldTitle, keepOnUnmount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
