import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StudentCoursePlain = t.Object({
  id: t.String(),
  courseId: t.String(),
  studentId: t.String(),
  courseSectionId: __nullable__(t.String()),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const StudentCourseRelations = t.Object({
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
  student: t.Object({
    id: t.String(),
    universityStudentId: t.String(),
    identificationNumber: t.String(),
    birthDate: t.Date(),
    enrolledDate: t.Date(),
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
  gradings: t.Array(
    t.Object({
      id: t.String(),
      studentCourseId: t.String(),
      gradingDate: __nullable__(t.Date()),
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
      score: t.Number(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const StudentCoursePlainInputCreate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const StudentCoursePlainInputUpdate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const StudentCourseRelationsInputCreate = t.Object({
  course: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  student: t.Object({
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
  gradings: t.Optional(
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

export const StudentCourseRelationsInputUpdate = t.Partial(
  t.Object({
    course: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    student: t.Object({
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
    gradings: t.Partial(
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

export const StudentCourseWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          courseId: t.String(),
          studentId: t.String(),
          courseSectionId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "StudentCourse" },
  ),
);

export const StudentCourseWhereUnique = t.Recursive(
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
            studentId: t.String(),
            courseSectionId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "StudentCourse" },
);

export const StudentCourseSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    courseId: t.Boolean(),
    course: t.Boolean(),
    studentId: t.Boolean(),
    student: t.Boolean(),
    courseSectionId: t.Boolean(),
    courseSection: t.Boolean(),
    gradings: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const StudentCourseInclude = t.Partial(
  t.Object({
    course: t.Boolean(),
    student: t.Boolean(),
    courseSection: t.Boolean(),
    gradings: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const StudentCourseOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    studentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const StudentCourse = t.Composite([
  StudentCoursePlain,
  StudentCourseRelations,
]);

export const StudentCourseInputCreate = t.Composite([
  StudentCoursePlainInputCreate,
  StudentCourseRelationsInputCreate,
]);

export const StudentCourseInputUpdate = t.Composite([
  StudentCoursePlainInputUpdate,
  StudentCourseRelationsInputUpdate,
]);
