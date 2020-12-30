export function buildQueryString(queryParams: Object) {
  return queryParams
    ? '?' + Object.keys(queryParams).reduce((acc, key) => [
      ...acc,
      `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    ], []).join('&')
    : '';
};
