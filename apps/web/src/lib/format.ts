export function formatNumberLocale(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("th-TH", options).format(value);
}
