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
