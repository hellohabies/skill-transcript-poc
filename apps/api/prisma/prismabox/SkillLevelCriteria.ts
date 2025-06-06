import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SkillLevelCriteriaPlain = t.Object({
  id: t.String(),
  skillLevelId: t.String(),
  criteriaNameTh: t.String(),
  criteriaNameEn: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const SkillLevelCriteriaRelations = t.Object({
  skillLevel: t.Object({
    id: t.String(),
    skillId: t.String(),
    level: t.Integer(),
    descriptionTh: t.String(),
    descriptionEn: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  cloSkillLevelCriterias: t.Array(
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
});

export const SkillLevelCriteriaPlainInputCreate = t.Object({
  criteriaNameTh: t.String(),
  criteriaNameEn: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillLevelCriteriaPlainInputUpdate = t.Object({
  criteriaNameTh: t.Optional(t.String()),
  criteriaNameEn: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillLevelCriteriaRelationsInputCreate = t.Object({
  skillLevel: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  cloSkillLevelCriterias: t.Optional(
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

export const SkillLevelCriteriaRelationsInputUpdate = t.Partial(
  t.Object({
    skillLevel: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    cloSkillLevelCriterias: t.Partial(
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

export const SkillLevelCriteriaWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          skillLevelId: t.String(),
          criteriaNameTh: t.String(),
          criteriaNameEn: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "SkillLevelCriteria" },
  ),
);

export const SkillLevelCriteriaWhereUnique = t.Recursive(
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
            skillLevelId: t.String(),
            criteriaNameTh: t.String(),
            criteriaNameEn: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "SkillLevelCriteria" },
);

export const SkillLevelCriteriaSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    skillLevelId: t.Boolean(),
    skillLevel: t.Boolean(),
    criteriaNameTh: t.Boolean(),
    criteriaNameEn: t.Boolean(),
    cloSkillLevelCriterias: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SkillLevelCriteriaInclude = t.Partial(
  t.Object({
    skillLevel: t.Boolean(),
    cloSkillLevelCriterias: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SkillLevelCriteriaOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    skillLevelId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    criteriaNameTh: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    criteriaNameEn: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const SkillLevelCriteria = t.Composite([
  SkillLevelCriteriaPlain,
  SkillLevelCriteriaRelations,
]);

export const SkillLevelCriteriaInputCreate = t.Composite([
  SkillLevelCriteriaPlainInputCreate,
  SkillLevelCriteriaRelationsInputCreate,
]);

export const SkillLevelCriteriaInputUpdate = t.Composite([
  SkillLevelCriteriaPlainInputUpdate,
  SkillLevelCriteriaRelationsInputUpdate,
]);
