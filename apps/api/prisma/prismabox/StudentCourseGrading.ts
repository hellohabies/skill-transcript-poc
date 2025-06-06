import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StudentCourseGradingPlain = t.Object({
  id: t.String(),
  studentCourseId: t.String(),
  gradingDate: __nullable__(t.Date()),
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
});

export const StudentCourseGradingRelations = t.Object({
  studentCourse: t.Object({
    id: t.String(),
    courseId: t.String(),
    studentId: t.String(),
    courseSectionId: __nullable__(t.String()),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  gradingCloResults: t.Array(
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
      index: t.Integer(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const StudentCourseGradingPlainInputCreate = t.Object({
  gradingDate: t.Optional(__nullable__(t.Date())),
  grade: t.Optional(
    t.Union([
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
  ),
  score: t.Optional(t.Number()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const StudentCourseGradingPlainInputUpdate = t.Object({
  gradingDate: t.Optional(__nullable__(t.Date())),
  grade: t.Optional(
    t.Union([
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
  ),
  score: t.Optional(t.Number()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const StudentCourseGradingRelationsInputCreate = t.Object({
  studentCourse: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  gradingCloResults: t.Optional(
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

export const StudentCourseGradingRelationsInputUpdate = t.Partial(
  t.Object({
    studentCourse: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    gradingCloResults: t.Partial(
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

export const StudentCourseGradingWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
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
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "StudentCourseGrading" },
  ),
);

export const StudentCourseGradingWhereUnique = t.Recursive(
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
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "StudentCourseGrading" },
);

export const StudentCourseGradingSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    studentCourseId: t.Boolean(),
    studentCourse: t.Boolean(),
    gradingDate: t.Boolean(),
    grade: t.Boolean(),
    score: t.Boolean(),
    gradingCloResults: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const StudentCourseGradingInclude = t.Partial(
  t.Object({
    studentCourse: t.Boolean(),
    grade: t.Boolean(),
    gradingCloResults: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const StudentCourseGradingOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    studentCourseId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    gradingDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    score: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const StudentCourseGrading = t.Composite([
  StudentCourseGradingPlain,
  StudentCourseGradingRelations,
]);

export const StudentCourseGradingInputCreate = t.Composite([
  StudentCourseGradingPlainInputCreate,
  StudentCourseGradingRelationsInputCreate,
]);

export const StudentCourseGradingInputUpdate = t.Composite([
  StudentCourseGradingPlainInputUpdate,
  StudentCourseGradingRelationsInputUpdate,
]);
