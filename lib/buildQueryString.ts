export function buildQueryString(queryParams: Record<string, string | number | boolean>): string {
  return queryParams
    ? '?' +
        Object.keys(queryParams)
          .reduce(
            (acc, key) => [
              ...acc,
              `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
            ],
            []
          )
          .join('&')
    : ''
}
