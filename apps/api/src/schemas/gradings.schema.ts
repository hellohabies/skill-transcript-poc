import { t } from "elysia";
import { softDeleteBaseSchema } from "./base.schema";
import { Grade } from "../../prisma/prismabox/Grade";
import { GradingResult } from "../../prisma/prismabox/GradingResult";

export const studentCourseGradingBaseSchema = {
  id: t.String(),
  studentCourseId: t.String(),
  gradingDate: t.Nullable(t.Date()),
  grade: Grade,
  score: t.Number(),
  ...softDeleteBaseSchema,
};

export const gradingCloResultBaseSchema = {
  id: t.String(),
  studentCourseGradingId: t.String(),
  cloId: t.String(),
  result: GradingResult,
  ...softDeleteBaseSchema,
};
