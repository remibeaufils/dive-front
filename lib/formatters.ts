const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'EUR',
  // @ts-ignore https://github.com/microsoft/TypeScript/pull/40709
  // notation: 'compact',
  currencyDisplay: 'symbol',
  minimumFractionDigits: 2,
  style: 'currency',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
  timeZone: 'Europe/Paris',
  // timeZoneName: 'short',
})

const dateFormatterShort = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  // weekday: 'long',
  // year: 'numeric',
  timeZone: 'Europe/Paris',
  // timeZoneName: 'short',
})

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Paris',
})

const monthFormatterShort = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'Europe/Paris',
})

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
})

const yearFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  timeZone: 'Europe/Paris',
})

export const format = (type: string, value: string | number, short?: boolean): string => {
  switch (type) {
    case 'currency':
      return currencyFormatter.format(value as number)
    case 'day':
      return short
        ? dateFormatterShort.format(new Date(value))
        : dateFormatter.format(new Date(value))
    case 'number':
      return numberFormatter.format(value as number)
    case 'percent':
      return percentFormatter.format(value as number)
    case 'month':
      return short
        ? monthFormatterShort.format(new Date(value))
        : monthFormatter.format(new Date(value))
    case 'week':
      return short
        ? dateFormatterShort.format(new Date(value))
        : `Week of ${dateFormatter.format(new Date(value)).replace(/,/g, '')}`
    case 'year':
      return yearFormatter.format(new Date(value))
    default:
      return value as string
  }
}
