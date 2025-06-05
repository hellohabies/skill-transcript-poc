import { t } from "elysia";

export const baseResponseSchema = {
  statusCode: t.Number(),
  isSuccess: t.Boolean(),
  error: t.Null(),
};
