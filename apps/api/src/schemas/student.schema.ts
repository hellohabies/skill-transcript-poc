import { t } from "elysia";

export const studentSchema = {
  id: t.String(),
  universityStudentId: t.String(),
  identificationNumber: t.String(),
  birthDate: t.Date(),
  enrolledDate: t.Date(),
  affiliatedCurriculumId: t.String(),
  affiliatedCurriculum: t.Optional(t.Object({})),
};
