import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SkillPlain = t.Object({
  id: t.String(),
  skillMappingRefId: t.String(),
  nameTh: t.String(),
  nameEn: t.String(),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  type: t.Union([
    t.Literal("SPECIFIC"),
    t.Literal("GENERAL"),
    t.Literal("MAIN"),
    t.Literal("OTHER"),
  ]),
  isMainSkill: t.Boolean(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const SkillRelations = t.Object({
  skillLevels: t.Array(
    t.Object({
      id: t.String(),
      skillId: t.String(),
      level: t.Integer(),
      descriptionTh: t.String(),
      descriptionEn: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  courseSkills: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      skillId: t.String(),
      index: t.Integer(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const SkillPlainInputCreate = t.Object({
  nameTh: t.String(),
  nameEn: t.String(),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  type: t.Union([
    t.Literal("SPECIFIC"),
    t.Literal("GENERAL"),
    t.Literal("MAIN"),
    t.Literal("OTHER"),
  ]),
  isMainSkill: t.Optional(t.Boolean()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillPlainInputUpdate = t.Object({
  nameTh: t.Optional(t.String()),
  nameEn: t.Optional(t.String()),
  descriptionTh: t.Optional(t.String()),
  descriptionEn: t.Optional(t.String()),
  type: t.Optional(
    t.Union([
      t.Literal("SPECIFIC"),
      t.Literal("GENERAL"),
      t.Literal("MAIN"),
      t.Literal("OTHER"),
    ]),
  ),
  isMainSkill: t.Optional(t.Boolean()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillRelationsInputCreate = t.Object({
  skillLevels: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  courseSkills: t.Optional(
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

export const SkillRelationsInputUpdate = t.Partial(
  t.Object({
    skillLevels: t.Partial(
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
    courseSkills: t.Partial(
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

export const SkillWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          skillMappingRefId: t.String(),
          nameTh: t.String(),
          nameEn: t.String(),
          descriptionTh: t.String(),
          descriptionEn: t.String(),
          type: t.Union([
            t.Literal("SPECIFIC"),
            t.Literal("GENERAL"),
            t.Literal("MAIN"),
            t.Literal("OTHER"),
          ]),
          isMainSkill: t.Boolean(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Skill" },
  ),
);

export const SkillWhereUnique = t.Recursive(
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
            skillMappingRefId: t.String(),
            nameTh: t.String(),
            nameEn: t.String(),
            descriptionTh: t.String(),
            descriptionEn: t.String(),
            type: t.Union([
              t.Literal("SPECIFIC"),
              t.Literal("GENERAL"),
              t.Literal("MAIN"),
              t.Literal("OTHER"),
            ]),
            isMainSkill: t.Boolean(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Skill" },
);

export const SkillSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    skillMappingRefId: t.Boolean(),
    nameTh: t.Boolean(),
    nameEn: t.Boolean(),
    descriptionTh: t.Boolean(),
    descriptionEn: t.Boolean(),
    type: t.Boolean(),
    isMainSkill: t.Boolean(),
    skillLevels: t.Boolean(),
    courseSkills: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SkillInclude = t.Partial(
  t.Object({
    type: t.Boolean(),
    skillLevels: t.Boolean(),
    courseSkills: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SkillOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    skillMappingRefId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    nameTh: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    nameEn: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    descriptionTh: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    descriptionEn: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    isMainSkill: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Skill = t.Composite([SkillPlain, SkillRelations]);

export const SkillInputCreate = t.Composite([
  SkillPlainInputCreate,
  SkillRelationsInputCreate,
]);

export const SkillInputUpdate = t.Composite([
  SkillPlainInputUpdate,
  SkillRelationsInputUpdate,
]);
