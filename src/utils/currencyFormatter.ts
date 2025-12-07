/**
 * Formats a number as a simple USD price string with dollar sign
 * @param amount - The numeric amount to format
 * @returns Formatted price string (e.g., "$30.00")
 */
export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
