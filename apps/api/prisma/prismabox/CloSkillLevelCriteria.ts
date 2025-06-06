import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CloSkillLevelCriteriaPlain = t.Object({
  id: t.String(),
  courseId: t.String(),
  cloId: t.String(),
  skillLevelCriteriaId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CloSkillLevelCriteriaRelations = t.Object({
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
  skillLevelCriteria: t.Object({
    id: t.String(),
    skillLevelId: t.String(),
    criteriaNameTh: t.String(),
    criteriaNameEn: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
});

export const CloSkillLevelCriteriaPlainInputCreate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CloSkillLevelCriteriaPlainInputUpdate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CloSkillLevelCriteriaRelationsInputCreate = t.Object({
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
  skillLevelCriteria: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const CloSkillLevelCriteriaRelationsInputUpdate = t.Partial(
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
    skillLevelCriteria: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const CloSkillLevelCriteriaWhere = t.Partial(
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
          skillLevelCriteriaId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "CloSkillLevelCriteria" },
  ),
);

export const CloSkillLevelCriteriaWhereUnique = t.Recursive(
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
            skillLevelCriteriaId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "CloSkillLevelCriteria" },
);

export const CloSkillLevelCriteriaSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    courseId: t.Boolean(),
    course: t.Boolean(),
    cloId: t.Boolean(),
    clo: t.Boolean(),
    skillLevelCriteriaId: t.Boolean(),
    skillLevelCriteria: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CloSkillLevelCriteriaInclude = t.Partial(
  t.Object({
    course: t.Boolean(),
    clo: t.Boolean(),
    skillLevelCriteria: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CloSkillLevelCriteriaOrderBy = t.Partial(
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
    skillLevelCriteriaId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const CloSkillLevelCriteria = t.Composite([
  CloSkillLevelCriteriaPlain,
  CloSkillLevelCriteriaRelations,
]);

export const CloSkillLevelCriteriaInputCreate = t.Composite([
  CloSkillLevelCriteriaPlainInputCreate,
  CloSkillLevelCriteriaRelationsInputCreate,
]);

export const CloSkillLevelCriteriaInputUpdate = t.Composite([
  CloSkillLevelCriteriaPlainInputUpdate,
  CloSkillLevelCriteriaRelationsInputUpdate,
]);
