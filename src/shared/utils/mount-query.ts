export type QueryStringOptions = {
  encode?: boolean;
};

export const mountQuery = <T extends Record<string, unknown>>(
  t: T,
  options?: QueryStringOptions
): string => {
  const params = new URLSearchParams();

  Object.entries(t).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  return options?.encode === false
    ? params.toString()
    : decodeURIComponent(params.toString());
};
