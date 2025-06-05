export const getDateTimeNow24H = () => {
  const now = new Date();
  const options = { hour12: false, timeZone: "Asia/Bangkok" };
  return now.toLocaleString("en-US", options);
};
