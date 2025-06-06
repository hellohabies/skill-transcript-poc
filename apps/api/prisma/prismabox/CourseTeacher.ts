import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CourseTeacherPlain = t.Object({
  id: t.String(),
  courseId: t.String(),
  teacherId: t.String(),
  courseSectionId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const CourseTeacherRelations = t.Object({
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
  teacher: t.Object({
    id: t.String(),
    universityTeacherId: t.String(),
    identificationNumber: t.String(),
    affiliatedCurriculumId: t.String(),
    userId: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  courseSection: __nullable__(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      section: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
  ),
});

export const CourseTeacherPlainInputCreate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseTeacherPlainInputUpdate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseTeacherRelationsInputCreate = t.Object({
  course: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  teacher: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  courseSection: t.Optional(
    t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  ),
});

export const CourseTeacherRelationsInputUpdate = t.Partial(
  t.Object({
    course: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    teacher: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    courseSection: t.Partial(
      t.Object({
        connect: t.Object({
          id: t.String(),
        }),
        disconnect: t.Boolean(),
      }),
    ),
  }),
);

export const CourseTeacherWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          courseId: t.String(),
          teacherId: t.String(),
          courseSectionId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "CourseTeacher" },
  ),
);

export const CourseTeacherWhereUnique = t.Recursive(
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
            teacherId: t.String(),
            courseSectionId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "CourseTeacher" },
);

export const CourseTeacherSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    courseId: t.Boolean(),
    course: t.Boolean(),
    teacherId: t.Boolean(),
    teacher: t.Boolean(),
    courseSectionId: t.Boolean(),
    courseSection: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseTeacherInclude = t.Partial(
  t.Object({
    course: t.Boolean(),
    teacher: t.Boolean(),
    courseSection: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseTeacherOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    teacherId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseSectionId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const CourseTeacher = t.Composite([
  CourseTeacherPlain,
  CourseTeacherRelations,
]);

export const CourseTeacherInputCreate = t.Composite([
  CourseTeacherPlainInputCreate,
  CourseTeacherRelationsInputCreate,
]);

export const CourseTeacherInputUpdate = t.Composite([
  CourseTeacherPlainInputUpdate,
  CourseTeacherRelationsInputUpdate,
]);
