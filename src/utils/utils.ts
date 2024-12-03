export const formatTimeSince = (time: Date | null) => {
  if (!time) return '';
  const now = new Date();
  const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (seconds < 60) return seconds < 2 ? `${seconds} second ago` : `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes < 2 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours < 2 ? `${hours} hour ago` : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};