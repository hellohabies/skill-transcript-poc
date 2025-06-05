import { Admin, Curriculum, Faculty, Student, Teacher, University } from "@prisma/client";
import { Static, t } from "elysia";

export const signInRequestSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
});

export const getMeSchema = t.Object({
  id: t.String(),
  nameTitle: t.String(),
  firstName: t.String(),
  lastName: t.String(),
  email: t.String({ format: "email" }),
  sex: t.String(),
  role: t.String(),
  student: t.Nullable(
    t.Object({
      id: t.String(),
      universityStudentId: t.String(),
      identificationNumber: t.String(),
      birthDate: t.Date(),
      enrolledDate: t.Date(),
      affiliatedCurriculumId: t.String(),
      affiliatedCurriculum: t.Object({
        degreeName: t.String(),
        facultyId: t.String(),
        faculty: t.Object({
          id: t.String(),
          name: t.String(),
          universityId: t.String(),
          university: t.Object({
            emblemImageSrc: t.Optional(t.String()),
            id: t.String(),
            name: t.String(),
          }),
        }),
        id: t.String(),
        programName: t.String(),
      }),
      userId: t.String(),
    })
  ),
  teacher: t.Nullable(
    t.Object({
      id: t.String(),
      identificationNumber: t.String(),
      universityTeacherId: t.String(),
      userId: t.String(),
      affiliatedCurriculumId: t.String(),
      affiliatedCurriculum: t.Object({
        degreeName: t.String(),
        facultyId: t.String(),
        faculty: t.Object({
          id: t.String(),
          name: t.String(),
          universityId: t.String(),
          university: t.Object({
            emblemImageSrc: t.Optional(t.String()),
            id: t.String(),
            name: t.String(),
          }),
        }),
        id: t.String(),
        programName: t.String(),
      }),
    })
  ),
  admin: t.Nullable(
    t.Object({
      id: t.String(),
      userId: t.String(),
    })
  ),
});

export type SignInRequestSchema = Static<typeof signInRequestSchema>;
export type GetMeResponseSchema = Static<typeof getMeSchema>;
