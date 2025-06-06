import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SkillLevelPlain = t.Object({
  id: t.String(),
  skillId: t.String(),
  level: t.Integer(),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const SkillLevelRelations = t.Object({
  skill: t.Object({
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
    courseId: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  methods: t.Array(
    t.Object({
      id: t.String(),
      skillLevelId: t.String(),
      methodNameTh: t.String(),
      methodNameEn: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  criterias: t.Array(
    t.Object({
      id: t.String(),
      skillLevelId: t.String(),
      criteriaNameTh: t.String(),
      criteriaNameEn: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const SkillLevelPlainInputCreate = t.Object({
  level: t.Optional(t.Integer()),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillLevelPlainInputUpdate = t.Object({
  level: t.Optional(t.Integer()),
  descriptionTh: t.Optional(t.String()),
  descriptionEn: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const SkillLevelRelationsInputCreate = t.Object({
  skill: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  methods: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  criterias: t.Optional(
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

export const SkillLevelRelationsInputUpdate = t.Partial(
  t.Object({
    skill: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    methods: t.Partial(
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
    criterias: t.Partial(
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

export const SkillLevelWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          skillId: t.String(),
          level: t.Integer(),
          descriptionTh: t.String(),
          descriptionEn: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "SkillLevel" },
  ),
);

export const SkillLevelWhereUnique = t.Recursive(
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
            skillId: t.String(),
            level: t.Integer(),
            descriptionTh: t.String(),
            descriptionEn: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "SkillLevel" },
);

export const SkillLevelSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    skillId: t.Boolean(),
    skill: t.Boolean(),
    level: t.Boolean(),
    descriptionTh: t.Boolean(),
    descriptionEn: t.Boolean(),
    methods: t.Boolean(),
    criterias: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SkillLevelInclude = t.Partial(
  t.Object({
    skill: t.Boolean(),
    methods: t.Boolean(),
    criterias: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const SkillLevelOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    skillId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    level: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    descriptionTh: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    descriptionEn: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const SkillLevel = t.Composite([SkillLevelPlain, SkillLevelRelations]);

export const SkillLevelInputCreate = t.Composite([
  SkillLevelPlainInputCreate,
  SkillLevelRelationsInputCreate,
]);

export const SkillLevelInputUpdate = t.Composite([
  SkillLevelPlainInputUpdate,
  SkillLevelRelationsInputUpdate,
]);
