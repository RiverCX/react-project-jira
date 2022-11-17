import { useEffect, useState } from "react";

let number = [1, 2, "3"];

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
  }, []);
};

export const debounce = (callback: () => void, delay: number) => {
  let timeout;
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => callback(), delay);
};

// 需要改成泛型
export const useDebounce = <V>(value: V, delay?: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
