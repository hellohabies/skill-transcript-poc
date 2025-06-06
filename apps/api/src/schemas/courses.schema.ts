import { t, Static } from "elysia";

export const createCourseRequestSchema = t.Object({
  courseCode: t.String(),
  nameTh: t.String(),
  nameEn: t.String(),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  teacherId: t.String(),
  curriculumId: t.String(),
});

export type CreateCourseRequestSchema = Static<typeof createCourseRequestSchema>;
