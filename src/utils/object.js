export const isObject = obj => {
  let isObjetct = false;
  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null)
    isObjetct = true;

  return isObjetct;
};
