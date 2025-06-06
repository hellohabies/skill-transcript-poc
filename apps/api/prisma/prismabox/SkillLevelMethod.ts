import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SkillLevelMethodPlain = t.Object({
  id: t.String(),
  skillLevelId: t.String(),
  methodNameTh: t.String(),
  methodNameEn: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const SkillLevelMethodRelations = t.Object({
  skillLevel: t.Object({
    id: t.String(),
    skillId: t.String(),
    level: t.Integer(),
    descriptionTh: t.String(),
    descriptionEn: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
});

export const SkillLevelMethodPlainInputCreate = t.Object({
  methodNameTh: t.String(),
  methodNameEn: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillLevelMethodPlainInputUpdate = t.Object({
  methodNameTh: t.Optional(t.String()),
  methodNameEn: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillLevelMethodRelationsInputCreate = t.Object({
  skillLevel: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const SkillLevelMethodRelationsInputUpdate = t.Partial(
  t.Object({
    skillLevel: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const SkillLevelMethodWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          skillLevelId: t.String(),
          methodNameTh: t.String(),
          methodNameEn: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "SkillLevelMethod" },
  ),
);

export const SkillLevelMethodWhereUnique = t.Recursive(
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
            methodNameTh: t.String(),
            methodNameEn: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "SkillLevelMethod" },
);

export const SkillLevelMethodSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    skillLevelId: t.Boolean(),
    skillLevel: t.Boolean(),
    methodNameTh: t.Boolean(),
    methodNameEn: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SkillLevelMethodInclude = t.Partial(
  t.Object({ skillLevel: t.Boolean(), _count: t.Boolean() }),
);

export const SkillLevelMethodOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    skillLevelId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    methodNameTh: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    methodNameEn: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const SkillLevelMethod = t.Composite([
  SkillLevelMethodPlain,
  SkillLevelMethodRelations,
]);

export const SkillLevelMethodInputCreate = t.Composite([
  SkillLevelMethodPlainInputCreate,
  SkillLevelMethodRelationsInputCreate,
]);

export const SkillLevelMethodInputUpdate = t.Composite([
  SkillLevelMethodPlainInputUpdate,
  SkillLevelMethodRelationsInputUpdate,
]);
