import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CourseGradingCriteriaPlain = t.Object({
  id: t.String(),
  courseId: t.String(),
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
  minScore: t.Number(),
  maxScore: t.Number(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CourseGradingCriteriaRelations = t.Object({
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
});

export const CourseGradingCriteriaPlainInputCreate = t.Object({
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
  minScore: t.Number(),
  maxScore: t.Number(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseGradingCriteriaPlainInputUpdate = t.Object({
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
  minScore: t.Optional(t.Number()),
  maxScore: t.Optional(t.Number()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseGradingCriteriaRelationsInputCreate = t.Object({
  course: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const CourseGradingCriteriaRelationsInputUpdate = t.Partial(
  t.Object({
    course: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const CourseGradingCriteriaWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          courseId: t.String(),
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
          minScore: t.Number(),
          maxScore: t.Number(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "CourseGradingCriteria" },
  ),
);

export const CourseGradingCriteriaWhereUnique = t.Recursive(
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
            minScore: t.Number(),
            maxScore: t.Number(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "CourseGradingCriteria" },
);

export const CourseGradingCriteriaSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    courseId: t.Boolean(),
    course: t.Boolean(),
    grade: t.Boolean(),
    minScore: t.Boolean(),
    maxScore: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseGradingCriteriaInclude = t.Partial(
  t.Object({ course: t.Boolean(), grade: t.Boolean(), _count: t.Boolean() }),
);

export const CourseGradingCriteriaOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    minScore: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    maxScore: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const CourseGradingCriteria = t.Composite([
  CourseGradingCriteriaPlain,
  CourseGradingCriteriaRelations,
]);

export const CourseGradingCriteriaInputCreate = t.Composite([
  CourseGradingCriteriaPlainInputCreate,
  CourseGradingCriteriaRelationsInputCreate,
]);

export const CourseGradingCriteriaInputUpdate = t.Composite([
  CourseGradingCriteriaPlainInputUpdate,
  CourseGradingCriteriaRelationsInputUpdate,
]);
