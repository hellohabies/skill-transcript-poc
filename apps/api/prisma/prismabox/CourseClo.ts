import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CourseCloPlain = t.Object({
  id: t.String(),
  courseId: t.String(),
  cloId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CourseCloRelations = t.Object({
  course: t.Object({
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
  clo: t.Object({
    id: t.String(),
    type: t.Union([t.Literal("K"), t.Literal("S"), t.Literal("A")]),
    name: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
});

export const CourseCloPlainInputCreate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseCloPlainInputUpdate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseCloRelationsInputCreate = t.Object({
  course: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  clo: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const CourseCloRelationsInputUpdate = t.Partial(
  t.Object({
    course: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    clo: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const CourseCloWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          courseId: t.String(),
          cloId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "CourseClo" },
  ),
);

export const CourseCloWhereUnique = t.Recursive(
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
            courseId: t.String(),
            cloId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "CourseClo" },
);

export const CourseCloSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    courseId: t.Boolean(),
    course: t.Boolean(),
    cloId: t.Boolean(),
    clo: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseCloInclude = t.Partial(
  t.Object({ course: t.Boolean(), clo: t.Boolean(), _count: t.Boolean() }),
);

export const CourseCloOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    cloId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const CourseClo = t.Composite([CourseCloPlain, CourseCloRelations]);

export const CourseCloInputCreate = t.Composite([
  CourseCloPlainInputCreate,
  CourseCloRelationsInputCreate,
]);

export const CourseCloInputUpdate = t.Composite([
  CourseCloPlainInputUpdate,
  CourseCloRelationsInputUpdate,
]);
