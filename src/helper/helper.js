export const formatDate = (isoString) => {
  if (!isoString) return null;
  return new Date(isoString)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
};