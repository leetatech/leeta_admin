export function formatDate(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return new Date(timestamp * 1000).toLocaleString('en-US', options).replace(',', '');
}
