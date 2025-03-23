
/**
 * Format a price with thousands separators
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

/**
 * Format a currency value with HNXZ currency
 */
export const formatCurrency = (amount: number): string => {
  return `${new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)} HNXZ`;
};
