export const replaceUrlParams = (
  url: string,
  params: Record<string, string | number>,
): string => {
  return url.replace(/:([a-zA-Z]+)/g, (_, key) => {
    if (params[key] !== undefined) {
      return params[key].toString();
    }
    throw new Error(`Missing parameter: ${key}`);
  });
};
