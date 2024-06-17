export const env = (key, defaultValue) => {
  const value = process.env[key];
  return value !== undefined ? value : defaultValue;
};
