export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',    // Jan, Feb, Mar, ...
    day: 'numeric',    // 1, 2, 3, ...
    year: 'numeric',   // 2025
  };

  return date.toLocaleDateString('en-US', options);
}