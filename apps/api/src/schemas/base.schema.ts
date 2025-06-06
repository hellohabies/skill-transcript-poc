import { t } from "elysia";

export const softDeleteBaseSchema = {
  isDeleted: t.Boolean(),
  deletedAt: t.Nullable(t.Date()),
};
