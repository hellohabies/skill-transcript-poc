import { t, Static } from "elysia";
import { softDeleteBaseSchema } from "./base.schema";
import { courseBaseSchema } from "./courses.schema";
import { gradingCloResultBaseSchema, studentCourseGradingBaseSchema } from "./gradings.schema";
import { cloBaseSchema } from "./clos.schema";

export const studentSchema = {
  id: t.String(),
  universityStudentId: t.String(),
  identificationNumber: t.String(),
  birthDate: t.Date(),
  enrolledDate: t.Date(),
  affiliatedCurriculumId: t.String(),
  affiliatedCurriculum: t.Optional(t.Object({})),
};

export const studentCourseBaseSchema = {
  id: t.String(),
  courseId: t.String(),
  studentId: t.String(),
  courseSectionId: t.String(),
  ...softDeleteBaseSchema,
};

export const studentResponseSchema = t.Array(
  t.Object({
    ...studentCourseBaseSchema,
    course: t.Object({ ...courseBaseSchema }),
    gradings: t.Object({
      ...studentCourseGradingBaseSchema,
      gradingCloResults: t.Array(
        t.Object({
          ...gradingCloResultBaseSchema,
          clo: t.Object({ ...cloBaseSchema }),
        })
      ),
    }),
  })
);

export type StudentResponse = Static<typeof studentResponseSchema>;
