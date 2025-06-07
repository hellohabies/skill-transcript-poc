import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CourseSkillPlain = t.Object({
  id: t.String(),
  courseId: t.String(),
  skillId: t.String(),
  index: t.Integer(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CourseSkillRelations = t.Object({
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
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
});

export const CourseSkillPlainInputCreate = t.Object({
  index: t.Optional(t.Integer()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseSkillPlainInputUpdate = t.Object({
  index: t.Optional(t.Integer()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseSkillRelationsInputCreate = t.Object({
  course: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  skill: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const CourseSkillRelationsInputUpdate = t.Partial(
  t.Object({
    course: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    skill: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const CourseSkillWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          courseId: t.String(),
          skillId: t.String(),
          index: t.Integer(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "CourseSkill" },
  ),
);

export const CourseSkillWhereUnique = t.Recursive(
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
            skillId: t.String(),
            index: t.Integer(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "CourseSkill" },
);

export const CourseSkillSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    courseId: t.Boolean(),
    course: t.Boolean(),
    skillId: t.Boolean(),
    skill: t.Boolean(),
    index: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseSkillInclude = t.Partial(
  t.Object({ course: t.Boolean(), skill: t.Boolean(), _count: t.Boolean() }),
);

export const CourseSkillOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    skillId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    index: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const CourseSkill = t.Composite([
  CourseSkillPlain,
  CourseSkillRelations,
]);

export const CourseSkillInputCreate = t.Composite([
  CourseSkillPlainInputCreate,
  CourseSkillRelationsInputCreate,
]);

export const CourseSkillInputUpdate = t.Composite([
  CourseSkillPlainInputUpdate,
  CourseSkillRelationsInputUpdate,
]);
