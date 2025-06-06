import { t } from "elysia";
import { CloType } from "../../prisma/prismabox/CloType";
import { softDeleteBaseSchema } from "./base.schema";

export const cloBaseSchema = {
  id: t.String(),
  type: CloType,
  name: t.String(),
  ...softDeleteBaseSchema,
};
