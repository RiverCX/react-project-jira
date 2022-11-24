import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

export const cleanObj = (obj: object) => {
  if (!Object) return {};
  const result = { ...obj };
  Object.keys(result).map((key) => {
    //@ts-ignore
    const value = result[key];
    //@ts-ignore
    if (isVoid(value)) delete result[key];
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
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
