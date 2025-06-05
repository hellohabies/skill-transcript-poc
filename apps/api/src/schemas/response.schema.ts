import { Static, t } from "elysia";

export const errorResponseSchema = t.Object({
  statusCode: t.Number(),
  isSuccess: t.Boolean(),
  error: t.Nullable(
    t.Object({
      message: t.String(),
    })
  ),
  data: t.Null(),
});

export type ErrorResponse = Static<typeof errorResponseSchema>;
