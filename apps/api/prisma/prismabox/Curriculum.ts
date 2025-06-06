import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CurriculumPlain = t.Object({
  id: t.String(),
  degreeName: t.String(),
  programName: t.String(),
  facultyId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CurriculumRelations = t.Object({
  faculty: t.Object({
    id: t.String(),
    name: t.String(),
    universityId: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  students: t.Array(
    t.Object({
      id: t.String(),
      universityStudentId: t.String(),
      identificationNumber: t.String(),
      birthDate: t.Date(),
      enrolledDate: t.Date(),
      affiliatedCurriculumId: t.String(),
      userId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  teachers: t.Array(
    t.Object({
      id: t.String(),
      universityTeacherId: t.String(),
      identificationNumber: t.String(),
      affiliatedCurriculumId: t.String(),
      userId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  courses: t.Array(
    t.Object({
      id: t.String(),
      skillMappingRefId: t.String(),
      courseCode: t.String(),
      nameEn: t.String(),
      nameTh: t.String(),
      descriptionEn: t.String(),
      descriptionTh: t.String(),
      curriculumId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const CurriculumPlainInputCreate = t.Object({
  degreeName: t.String(),
  programName: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CurriculumPlainInputUpdate = t.Object({
  degreeName: t.Optional(t.String()),
  programName: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CurriculumRelationsInputCreate = t.Object({
  faculty: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  students: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  teachers: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
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

export const CurriculumRelationsInputUpdate = t.Partial(
  t.Object({
    faculty: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    students: t.Partial(
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
    teachers: t.Partial(
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

export const CurriculumWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          degreeName: t.String(),
          programName: t.String(),
          facultyId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Curriculum" },
  ),
);

export const CurriculumWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: true }),
          { additionalProperties: true },
        ),
        t.Union([t.Object({ id: t.String() })], { additionalProperties: true }),
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
            degreeName: t.String(),
            programName: t.String(),
            facultyId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Curriculum" },
);

export const CurriculumSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    degreeName: t.Boolean(),
    programName: t.Boolean(),
    facultyId: t.Boolean(),
    faculty: t.Boolean(),
    students: t.Boolean(),
    teachers: t.Boolean(),
    courses: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CurriculumInclude = t.Partial(
  t.Object({
    faculty: t.Boolean(),
    students: t.Boolean(),
    teachers: t.Boolean(),
    courses: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CurriculumOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    degreeName: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    programName: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    facultyId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Curriculum = t.Composite([CurriculumPlain, CurriculumRelations]);

export const CurriculumInputCreate = t.Composite([
  CurriculumPlainInputCreate,
  CurriculumRelationsInputCreate,
]);

export const CurriculumInputUpdate = t.Composite([
  CurriculumPlainInputUpdate,
  CurriculumRelationsInputUpdate,
]);
