import { t, Static } from "elysia";
import { CourseGradingCriteriaPlain } from "../../prisma/prismabox/CourseGradingCriteria";
import { baseResponseSchema } from "../routes/response";
import { CloPlain } from "../../prisma/prismabox/Clo";
import { softDeleteBaseSchema } from "./base.schema";
import { skillBaseSchema } from "./skills.schema";
import { CloType } from "../../prisma/prismabox/CloType";
import { cloBaseSchema } from "./clos.schema";

export const createCourseRequestSchema = t.Object({
  courseCode: t.String(),
  nameTh: t.String(),
  nameEn: t.String(),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  teacherId: t.String(),
  curriculumId: t.String(),
});

export const studentWithUserSchema = t.Object({
  id: t.String(),
  userId: t.String(),
  universityStudentId: t.String(),
  identificationNumber: t.String(),
  affiliatedCurriculumId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: t.Nullable(t.Date()),
  birthDate: t.Date(),
  enrolledDate: t.Date(),
  user: t.Nullable(
    t.Object({
      id: t.String(),
      email: t.String(),
      firstName: t.String(),
      lastName: t.String(),
    })
  ),
});

export const courseCloBaseSchema = {
  id: t.String(),
  courseId: t.String(),
  cloId: t.String(),
  ...softDeleteBaseSchema,
};

export const courseDetailSchema = t.Object({
  ...baseResponseSchema,
  data: t.Object({
    id: t.String(),
    skillMappingRefId: t.String(),
    courseCode: t.String(),
    nameTh: t.String(),
    nameEn: t.String(),
    descriptionTh: t.String(),
    descriptionEn: t.String(),
    curriculumId: t.String(),

    gradingCriterias: t.Array(CourseGradingCriteriaPlain),
    clos: t.Array(t.Object({ ...courseCloBaseSchema, clo: t.Object({ ...cloBaseSchema }) })),
    students: t.Array(studentWithUserSchema),
    skills: t.Array(t.Object({ ...skillBaseSchema })),
    ...softDeleteBaseSchema,
  }),
});

export type CreateCourseRequestSchema = Static<typeof createCourseRequestSchema>;
export type CourseDetailSchema = Static<typeof courseDetailSchema>;
