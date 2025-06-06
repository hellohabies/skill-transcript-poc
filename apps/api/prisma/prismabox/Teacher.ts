import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TeacherPlain = t.Object({
  id: t.String(),
  universityTeacherId: t.String(),
  identificationNumber: t.String(),
  affiliatedCurriculumId: t.String(),
  userId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const TeacherRelations = t.Object({
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
      teacherId: t.String(),
      courseSectionId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const TeacherPlainInputCreate = t.Object({
  identificationNumber: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const TeacherPlainInputUpdate = t.Object({
  identificationNumber: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const TeacherRelationsInputCreate = t.Object({
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

export const TeacherRelationsInputUpdate = t.Partial(
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

export const TeacherWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          universityTeacherId: t.String(),
          identificationNumber: t.String(),
          affiliatedCurriculumId: t.String(),
          userId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Teacher" },
  ),
);

export const TeacherWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), userId: t.String() },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ userId: t.String() })],
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
            universityTeacherId: t.String(),
            identificationNumber: t.String(),
            affiliatedCurriculumId: t.String(),
            userId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Teacher" },
);

export const TeacherSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    universityTeacherId: t.Boolean(),
    identificationNumber: t.Boolean(),
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

export const TeacherInclude = t.Partial(
  t.Object({
    affiliatedCurriculum: t.Boolean(),
    user: t.Boolean(),
    courses: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const TeacherOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    universityTeacherId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    identificationNumber: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Teacher = t.Composite([TeacherPlain, TeacherRelations]);

export const TeacherInputCreate = t.Composite([
  TeacherPlainInputCreate,
  TeacherRelationsInputCreate,
]);

export const TeacherInputUpdate = t.Composite([
  TeacherPlainInputUpdate,
  TeacherRelationsInputUpdate,
]);
