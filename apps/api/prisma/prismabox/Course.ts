import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CoursePlain = t.Object({
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
});

export const CourseRelations = t.Object({
  curriculum: t.Object({
    id: t.String(),
    degreeName: t.String(),
    programName: t.String(),
    facultyId: t.String(),
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
  sections: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      section: t.String(),
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
  gradingCriterias: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
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
      minScore: t.Number(),
      maxScore: t.Number(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  clos: t.Array(
    t.Object({
      id: t.String(),
      courseId: t.String(),
      cloId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
  skills: t.Array(
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
      courseId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
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

export const CoursePlainInputCreate = t.Object({
  courseCode: t.String(),
  nameEn: t.String(),
  nameTh: t.String(),
  descriptionEn: t.String(),
  descriptionTh: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CoursePlainInputUpdate = t.Object({
  courseCode: t.Optional(t.String()),
  nameEn: t.Optional(t.String()),
  nameTh: t.Optional(t.String()),
  descriptionEn: t.Optional(t.String()),
  descriptionTh: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const CourseRelationsInputCreate = t.Object({
  curriculum: t.Object({
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
  sections: t.Optional(
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
  gradingCriterias: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  clos: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  skills: t.Optional(
    t.Object({
      connect: t.Array(
        t.Object({
          id: t.String(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
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

export const CourseRelationsInputUpdate = t.Partial(
  t.Object({
    curriculum: t.Object({
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
    sections: t.Partial(
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
    gradingCriterias: t.Partial(
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
    clos: t.Partial(
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
    skills: t.Partial(
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

export const CourseWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          skillMappingRefId: t.String(),
          courseCode: t.String(),
          nameEn: t.String(),
          nameTh: t.String(),
          descriptionEn: t.String(),
          descriptionTh: t.String(),
          curriculumId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Course" },
  ),
);

export const CourseWhereUnique = t.Recursive(
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
            courseCode: t.String(),
            nameEn: t.String(),
            nameTh: t.String(),
            descriptionEn: t.String(),
            descriptionTh: t.String(),
            curriculumId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Course" },
);

export const CourseSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    skillMappingRefId: t.Boolean(),
    courseCode: t.Boolean(),
    nameEn: t.Boolean(),
    nameTh: t.Boolean(),
    descriptionEn: t.Boolean(),
    descriptionTh: t.Boolean(),
    curriculumId: t.Boolean(),
    curriculum: t.Boolean(),
    teachers: t.Boolean(),
    sections: t.Boolean(),
    students: t.Boolean(),
    gradingCriterias: t.Boolean(),
    clos: t.Boolean(),
    skills: t.Boolean(),
    cloSkillLevelCriterias: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseInclude = t.Partial(
  t.Object({
    curriculum: t.Boolean(),
    teachers: t.Boolean(),
    sections: t.Boolean(),
    students: t.Boolean(),
    gradingCriterias: t.Boolean(),
    clos: t.Boolean(),
    skills: t.Boolean(),
    cloSkillLevelCriterias: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const CourseOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    skillMappingRefId: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    courseCode: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    nameEn: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    nameTh: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    descriptionEn: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    descriptionTh: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    curriculumId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Course = t.Composite([CoursePlain, CourseRelations]);

export const CourseInputCreate = t.Composite([
  CoursePlainInputCreate,
  CourseRelationsInputCreate,
]);

export const CourseInputUpdate = t.Composite([
  CoursePlainInputUpdate,
  CourseRelationsInputUpdate,
]);
