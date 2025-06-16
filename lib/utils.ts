export const formatDate = (rawDate?: Date) => {
  if (!rawDate) return "";

  const dObj = new Date(rawDate);
  const year = dObj.getFullYear().toString().slice(2);
  const month = String(dObj.getMonth() + 1).padStart(2, "0");
  const date = String(dObj.getDate()).padStart(2, "0");

  return `${year}.${month}.${date}`;
};
