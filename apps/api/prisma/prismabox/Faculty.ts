import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const FacultyPlain = t.Object({
  id: t.String(),
  name: t.String(),
  universityId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const FacultyRelations = t.Object({
  university: t.Object({
    id: t.String(),
    emblemImageSrc: t.String(),
    name: t.String(),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
  curriculums: t.Array(
    t.Object({
      id: t.String(),
      degreeName: t.String(),
      programName: t.String(),
      facultyId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const FacultyPlainInputCreate = t.Object({
  name: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const FacultyPlainInputUpdate = t.Object({
  name: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const FacultyRelationsInputCreate = t.Object({
  university: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
  curriculums: t.Optional(
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

export const FacultyRelationsInputUpdate = t.Partial(
  t.Object({
    university: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
    curriculums: t.Partial(
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

export const FacultyWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          name: t.String(),
          universityId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Faculty" },
  ),
);

export const FacultyWhereUnique = t.Recursive(
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
            name: t.String(),
            universityId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Faculty" },
);

export const FacultySelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    name: t.Boolean(),
    universityId: t.Boolean(),
    university: t.Boolean(),
    curriculums: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const FacultyInclude = t.Partial(
  t.Object({
    university: t.Boolean(),
    curriculums: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const FacultyOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    name: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    universityId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Faculty = t.Composite([FacultyPlain, FacultyRelations]);

export const FacultyInputCreate = t.Composite([
  FacultyPlainInputCreate,
  FacultyRelationsInputCreate,
]);

export const FacultyInputUpdate = t.Composite([
  FacultyPlainInputUpdate,
  FacultyRelationsInputUpdate,
]);
