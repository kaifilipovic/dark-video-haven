/**
 * Formats seconds into a readable duration string (HH:MM:SS)
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // If hours > 0, include hours
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Otherwise just minutes:seconds
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Truncates a string to a maximum length and adds ellipsis if needed
 */
export function truncateString(str: string, maxLength: number = 100): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Format a date string into a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
