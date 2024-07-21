/**
 * Formats a number to a compact representation (K, M, B, T)
 * @param value The number to format
 * @param decimals The number of decimal places to show (default: 2)
 * @returns Formatted string
 */
export function formatCompactNumber(
  value: number,
  decimals: number = 2
): string {
  const absValue = Math.abs(value);
  if (absValue >= 1e12) return (value / 1e12).toFixed(decimals) + "T";
  if (absValue >= 1e9) return (value / 1e9).toFixed(decimals) + "B";
  if (absValue >= 1e6) return (value / 1e6).toFixed(decimals) + "M";
  if (absValue >= 1e3) return (value / 1e3).toFixed(decimals) + "K";
  return value.toFixed(decimals);
}

/**
 * Formats a dollar amount
 * @param value The dollar amount to format
 * @param compact Whether to use compact notation (default: true)
 * @returns Formatted string
 */
export function formatDollarAmount(
  value: number,
  compact: boolean = true
): string {
  if (compact) {
    return "$" + formatCompactNumber(value);
  }
  return (
    "$" +
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Formats a percentage
 * @param value The percentage value to format
 * @param decimals The number of decimal places to show (default: 2)
 * @returns Formatted string
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return value.toFixed(decimals) + "%";
}

/**
 * Formats a large number with commas
 * @param value The number to format
 * @returns Formatted string
 */
export function formatLargeNumber(value: number): string {
  return value.toLocaleString();
}

export function formatBigAmount(
  value: number,
  compact: boolean = true
): string {
  if (compact) {
    return formatCompactNumber(value);
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
