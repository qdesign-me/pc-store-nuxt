export function buildQuery(params: Record<string, string | number | undefined | null>) {
  if (!params) return '';
  if (params?.page === 1) params.page = undefined;
  const ret = Object.keys(params)
    .filter((key) => ('' + params[key]).length > 0)
    .map((key) => key + '=' + params[key])

    .join('&');

  return ret ? `?${ret}` : '';
}
