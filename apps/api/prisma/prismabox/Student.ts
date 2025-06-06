import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StudentPlain = t.Object({
  id: t.String(),
  universityStudentId: t.String(),
  identificationNumber: t.String(),
  birthDate: t.Date(),
  enrolledDate: t.Date(),
  affiliatedCurriculumId: t.String(),
  userId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const StudentRelations = t.Object({
  affiliatedCurriculum: t.Object({
    id: t.String(),
    degreeName: t.String(),
    programName: t.String(),
    facultyId: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  user: t.Object({
    id: t.String(),
    nameTitle: t.String(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    password: t.String(),
    sex: t.Union([t.Literal("MALE"), t.Literal("FEMALE"), t.Literal("OTHER")]),
    role: t.Union([
      t.Literal("TEACHER"),
      t.Literal("STUDENT"),
      t.Literal("ADMIN"),
    ]),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  courses: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      studentId: t.String(),
      courseSectionId: __nullable__(t.String()),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const StudentPlainInputCreate = t.Object({
  identificationNumber: t.String(),
  birthDate: t.Date(),
  enrolledDate: t.Date(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const StudentPlainInputUpdate = t.Object({
  identificationNumber: t.Optional(t.String()),
  birthDate: t.Optional(t.Date()),
  enrolledDate: t.Optional(t.Date()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const StudentRelationsInputCreate = t.Object({
  affiliatedCurriculum: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  user: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  courses: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
});

export const StudentRelationsInputUpdate = t.Partial(
  t.Object({
    affiliatedCurriculum: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    user: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    courses: t.Partial(
      t.Object({
        connect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
        disconnect: t.Array(
          t.Object({
            id: t.String(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
  }),
);

export const StudentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          universityStudentId: t.String(),
          identificationNumber: t.String(),
          birthDate: t.Date(),
          enrolledDate: t.Date(),
          affiliatedCurriculumId: t.String(),
          userId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Student" },
  ),
);

export const StudentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              userId: t.String(),
              universityStudentId_affiliatedCurriculumId: t.Object(
                {
                  universityStudentId: t.String(),
                  affiliatedCurriculumId: t.String(),
                },
                { additionalProperties: true },
              ),
            },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ userId: t.String() }),
            t.Object({
              universityStudentId_affiliatedCurriculumId: t.Object(
                {
                  universityStudentId: t.String(),
                  affiliatedCurriculumId: t.String(),
                },
                { additionalProperties: true },
              ),
            }),
          ],
          { additionalProperties: true },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
            NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
            OR: t.Array(Self, { additionalProperties: true }),
          }),
          { additionalProperties: true },
        ),
        t.Partial(
          t.Object({
            id: t.String(),
            universityStudentId: t.String(),
            identificationNumber: t.String(),
            birthDate: t.Date(),
            enrolledDate: t.Date(),
            affiliatedCurriculumId: t.String(),
            userId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Student" },
);

export const StudentSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    universityStudentId: t.Boolean(),
    identificationNumber: t.Boolean(),
    birthDate: t.Boolean(),
    enrolledDate: t.Boolean(),
    affiliatedCurriculumId: t.Boolean(),
    affiliatedCurriculum: t.Boolean(),
    userId: t.Boolean(),
    user: t.Boolean(),
    courses: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const StudentInclude = t.Partial(
  t.Object({
    affiliatedCurriculum: t.Boolean(),
    user: t.Boolean(),
    courses: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const StudentOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    universityStudentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    identificationNumber: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    birthDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    enrolledDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    affiliatedCurriculumId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    isDeleted: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    deletedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Student = t.Composite([StudentPlain, StudentRelations]);

export const StudentInputCreate = t.Composite([
  StudentPlainInputCreate,
  StudentRelationsInputCreate,
]);

export const StudentInputUpdate = t.Composite([
  StudentPlainInputUpdate,
  StudentRelationsInputUpdate,
]);
