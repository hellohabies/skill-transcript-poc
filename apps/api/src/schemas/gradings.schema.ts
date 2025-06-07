import { t, Static } from "elysia";
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
  index: t.Number(),
  ...softDeleteBaseSchema,
};

export const courseCloWeightBaseSchema = {
  id: t.String(),
  courseId: t.String(),
  cloId: t.String(),
  weight: t.Number(),
  ...softDeleteBaseSchema,
};

export const cloWeightSettingsRequestSchema = t.Array(
  t.Object({
    courseCloWeightId: t.String(),
    weight: t.Number(),
  })
);

export const cloWeightSettingsResponseSchema = t.Array(
  t.Object({
    courseCloWeightId: t.String(),
    weight: t.Number(),
  })
);

export const gradingCriteriaRequestSchema = t.Array(
  t.Object({
    courseGradingCriteriaId: t.String(),
    minScore: t.Number(),
    maxScore: t.Number(),
  })
);

export const gradingCriteriaResponseSchema = t.Array(
  t.Object({
    courseGradingCriteriaId: t.String(),
    minScore: t.Number(),
    maxScore: t.Number(),
  })
);

export const studentGradingRequestSchema = t.Object({
  courseId: t.String(),
  studentId: t.String(),
  cloId: t.String(),
  grade: GradingResult,
});

export const studentGradingResponseSchema = t.Object({
  courseId: t.String(),
  studentId: t.String(),
  cloId: t.String(),
  grade: GradingResult,
});

export const gradeAnnouncementRequestSchema = t.Object({
  courseId: t.String(),
});

export type CloWeightSettingsRequestSchema = Static<typeof cloWeightSettingsRequestSchema>;
export type CloWeightSettingsResponseSchema = Static<typeof cloWeightSettingsResponseSchema>;

export type GradingCriteriaRequestSchema = Static<typeof gradingCriteriaRequestSchema>;
export type GradingCriteriaResponseSchema = Static<typeof gradingCriteriaResponseSchema>;

export type StudentGradingRequestSchema = Static<typeof studentGradingRequestSchema>;
export type StudentGradingResponseSchema = Static<typeof studentGradingResponseSchema>;

export type GradeAnnouncementRequestSchema = Static<typeof gradeAnnouncementRequestSchema>;
