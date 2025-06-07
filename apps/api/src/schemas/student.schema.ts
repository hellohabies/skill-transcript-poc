import { t, Static } from "elysia";
import { softDeleteBaseSchema } from "./base.schema";
import { courseBaseSchema } from "./courses.schema";
import { gradingCloResultBaseSchema, studentCourseGradingBaseSchema } from "./gradings.schema";
import { cloBaseSchema } from "./clos.schema";
import { TeacherPlain } from "../../prisma/prismabox/Teacher";

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

export const teacherWithStudentSchema = {
  id: t.String(),
  universityTeacherId: t.String(),
  identificationNumber: t.String(),
  affiliatedCurriculumId: t.String(),
  userId: t.String(),
  user: t.Object({
    id: t.String(),
    nameTitle: t.String(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    password: t.String(),
    sex: t.String(),
    role: t.String(),
    ...softDeleteBaseSchema,
  }),
};

export const studentResponseSchema = t.Array(
  t.Object({
    ...studentCourseBaseSchema,
    course: t.Object({ ...courseBaseSchema, teacher: t.Object(teacherWithStudentSchema) }),
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
