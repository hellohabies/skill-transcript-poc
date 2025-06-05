import { getDateTimeNow24H } from "./date";

const INFO_PREFIX = "[INFO]";

export const logInfo = (origin: string, message: string) => {
  const now = getDateTimeNow24H();
  console.log(`[${now}] - ${INFO_PREFIX} [${origin}] : ${message}`);
};
