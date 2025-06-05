export function formatToBEDate(isoString: string): string {
  const date = new Date(isoString);
  const beYear = date.getFullYear() + 543;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${beYear} ${hour}:${minute}`;
}
