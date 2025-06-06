import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CloPlain = t.Object({
  id: t.String(),
  type: t.Union([t.Literal("K"), t.Literal("S"), t.Literal("A")]),
  name: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CloRelations = t.Object({
  GradingCloResult: t.Array(
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
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  CloSkillLevelCriteria: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      cloId: t.String(),
      skillLevelCriteriaId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  courses: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      cloId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const CloPlainInputCreate = t.Object({
  type: t.Union([t.Literal("K"), t.Literal("S"), t.Literal("A")]),
  name: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CloPlainInputUpdate = t.Object({
  type: t.Optional(t.Union([t.Literal("K"), t.Literal("S"), t.Literal("A")])),
  name: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CloRelationsInputCreate = t.Object({
  GradingCloResult: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  CloSkillLevelCriteria: t.Optional(
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

export const CloRelationsInputUpdate = t.Partial(
  t.Object({
    GradingCloResult: t.Partial(
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
    CloSkillLevelCriteria: t.Partial(
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

export const CloWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          type: t.Union([t.Literal("K"), t.Literal("S"), t.Literal("A")]),
          name: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Clo" },
  ),
);

export const CloWhereUnique = t.Recursive(
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
            type: t.Union([t.Literal("K"), t.Literal("S"), t.Literal("A")]),
            name: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Clo" },
);

export const CloSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    type: t.Boolean(),
    name: t.Boolean(),
    GradingCloResult: t.Boolean(),
    CloSkillLevelCriteria: t.Boolean(),
    courses: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CloInclude = t.Partial(
  t.Object({
    type: t.Boolean(),
    GradingCloResult: t.Boolean(),
    CloSkillLevelCriteria: t.Boolean(),
    courses: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CloOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    name: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Clo = t.Composite([CloPlain, CloRelations]);

export const CloInputCreate = t.Composite([
  CloPlainInputCreate,
  CloRelationsInputCreate,
]);

export const CloInputUpdate = t.Composite([
  CloPlainInputUpdate,
  CloRelationsInputUpdate,
]);
