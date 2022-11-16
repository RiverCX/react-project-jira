import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const isVoid = (value) =>
  value === undefined || value === null || value === "";

export const cleanObj = (obj) => {
  if (!Object) return {};
  const result = { ...obj };
  Object.keys(result).map((key) => {
    const value = result[key];
    if (isVoid(value)) delete result[key];
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const debounce = (callback, delay) => {
  let timeout;
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => callback(), delay);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
