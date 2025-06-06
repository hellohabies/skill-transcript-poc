import { Static, t } from "elysia";
import { userSchema } from "./auth.schema";

export const curriculumResponseSchema = t.Object({
  id: t.String(),
  degreeName: t.String(),
  programName: t.String(),
  facultyId: t.String(),
  courses: t.Array(
    t.Object({
      id: t.String(),
      skillMappingRefId: t.String(),
      courseCode: t.String(),
      nameTh: t.String(),
      nameEn: t.String(),
      descriptionTh: t.String(),
      descriptionEn: t.String(),
      curriculumId: t.String(),
      teachers: t.Array(
        t.Object({
          universityTeacherId: t.String(),
          identificationNumber: t.String(),
          affiliatedCurriculumId: t.String(),
          userId: t.String(),
          user: t.Object({
            ...userSchema,
          }),
        })
      ),
    })
  ),
});

export type CurriculumResponseSchema = Static<typeof curriculumResponseSchema>;
