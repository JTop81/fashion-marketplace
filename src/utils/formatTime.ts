const timeCache = new Map<string, string>();

export const formatTimeAgo = (dateString: string): string => {
  // Check cache first
  const cached = timeCache.get(dateString);
  if (cached) return cached;

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let result = "";
  if (years > 0) {
    result = `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    result = `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    result = `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    result = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    result = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    result = "just now";
  }

  // Cache the result
  timeCache.set(dateString, result);

  // Clear old cache entries every hour
  setTimeout(() => {
    timeCache.delete(dateString);
  }, 3600000); // 1 hour

  return result;
};
