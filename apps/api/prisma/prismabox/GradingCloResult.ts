import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const GradingCloResultPlain = t.Object({
  id: t.String(),
  studentCourseGradingId: t.String(),
  cloId: t.String(),
  result: t.Union([
    t.Literal("FAIL"),
    t.Literal("PASS"),
    t.Literal("GOOD"),
    t.Literal("VERY_GOOD"),
    t.Literal("EXCELLENT"),
    t.Literal("X"),
  ]),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const GradingCloResultRelations = t.Object({
  studentCourseGrading: t.Object({
    id: t.String(),
    studentCourseId: t.String(),
    gradingDate: t.Date(),
    grade: t.Union([
      t.Literal("A"),
      t.Literal("B_PLUS"),
      t.Literal("B"),
      t.Literal("C_PLUS"),
      t.Literal("C"),
      t.Literal("D_PLUS"),
      t.Literal("D"),
      t.Literal("F"),
      t.Literal("X"),
    ]),
    score: t.Number(),
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

export const GradingCloResultPlainInputCreate = t.Object({
  result: t.Optional(
    t.Union([
      t.Literal("FAIL"),
      t.Literal("PASS"),
      t.Literal("GOOD"),
      t.Literal("VERY_GOOD"),
      t.Literal("EXCELLENT"),
      t.Literal("X"),
    ]),
  ),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const GradingCloResultPlainInputUpdate = t.Object({
  result: t.Optional(
    t.Union([
      t.Literal("FAIL"),
      t.Literal("PASS"),
      t.Literal("GOOD"),
      t.Literal("VERY_GOOD"),
      t.Literal("EXCELLENT"),
      t.Literal("X"),
    ]),
  ),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const GradingCloResultRelationsInputCreate = t.Object({
  studentCourseGrading: t.Object({
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

export const GradingCloResultRelationsInputUpdate = t.Partial(
  t.Object({
    studentCourseGrading: t.Object({
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

export const GradingCloResultWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          studentCourseGradingId: t.String(),
          cloId: t.String(),
          result: t.Union([
            t.Literal("FAIL"),
            t.Literal("PASS"),
            t.Literal("GOOD"),
            t.Literal("VERY_GOOD"),
            t.Literal("EXCELLENT"),
            t.Literal("X"),
          ]),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "GradingCloResult" },
  ),
);

export const GradingCloResultWhereUnique = t.Recursive(
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
            studentCourseGradingId: t.String(),
            cloId: t.String(),
            result: t.Union([
              t.Literal("FAIL"),
              t.Literal("PASS"),
              t.Literal("GOOD"),
              t.Literal("VERY_GOOD"),
              t.Literal("EXCELLENT"),
              t.Literal("X"),
            ]),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "GradingCloResult" },
);

export const GradingCloResultSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    studentCourseGradingId: t.Boolean(),
    studentCourseGrading: t.Boolean(),
    cloId: t.Boolean(),
    clo: t.Boolean(),
    result: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const GradingCloResultInclude = t.Partial(
  t.Object({
    studentCourseGrading: t.Boolean(),
    clo: t.Boolean(),
    result: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const GradingCloResultOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    studentCourseGradingId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const GradingCloResult = t.Composite([
  GradingCloResultPlain,
  GradingCloResultRelations,
]);

export const GradingCloResultInputCreate = t.Composite([
  GradingCloResultPlainInputCreate,
  GradingCloResultRelationsInputCreate,
]);

export const GradingCloResultInputUpdate = t.Composite([
  GradingCloResultPlainInputUpdate,
  GradingCloResultRelationsInputUpdate,
]);
