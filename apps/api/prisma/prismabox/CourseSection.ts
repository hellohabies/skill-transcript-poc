import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CourseSectionPlain = t.Object({
  id: t.String(),
  courseId: t.String(),
  section: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CourseSectionRelations = t.Object({
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
  teachers: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      teacherId: t.String(),
      courseSectionId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  students: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      studentId: t.String(),
      courseSectionId: __nullable__(t.String()),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const CourseSectionPlainInputCreate = t.Object({
  section: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseSectionPlainInputUpdate = t.Object({
  section: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseSectionRelationsInputCreate = t.Object({
  course: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  teachers: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  students: t.Optional(
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

export const CourseSectionRelationsInputUpdate = t.Partial(
  t.Object({
    course: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    teachers: t.Partial(
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
    students: t.Partial(
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

export const CourseSectionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          courseId: t.String(),
          section: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "CourseSection" },
  ),
);

export const CourseSectionWhereUnique = t.Recursive(
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
            section: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "CourseSection" },
);

export const CourseSectionSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    courseId: t.Boolean(),
    course: t.Boolean(),
    section: t.Boolean(),
    teachers: t.Boolean(),
    students: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseSectionInclude = t.Partial(
  t.Object({
    course: t.Boolean(),
    teachers: t.Boolean(),
    students: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseSectionOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    section: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const CourseSection = t.Composite([
  CourseSectionPlain,
  CourseSectionRelations,
]);

export const CourseSectionInputCreate = t.Composite([
  CourseSectionPlainInputCreate,
  CourseSectionRelationsInputCreate,
]);

export const CourseSectionInputUpdate = t.Composite([
  CourseSectionPlainInputUpdate,
  CourseSectionRelationsInputUpdate,
]);
