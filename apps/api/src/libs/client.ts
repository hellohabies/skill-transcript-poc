export const getClientIp = (request: Request, server?: any): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return server?.requestIP(request)?.address || "unknown";
};
