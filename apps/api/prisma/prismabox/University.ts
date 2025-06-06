import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UniversityPlain = t.Object({
  id: t.String(),
  emblemImageSrc: t.String(),
  name: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const UniversityRelations = t.Object({
  faculties: t.Array(
    t.Object({
      id: t.String(),
      name: t.String(),
      universityId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
    { additionalProperties: true },
  ),
});

export const UniversityPlainInputCreate = t.Object({
  emblemImageSrc: t.String(),
  name: t.String(),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const UniversityPlainInputUpdate = t.Object({
  emblemImageSrc: t.Optional(t.String()),
  name: t.Optional(t.String()),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const UniversityRelationsInputCreate = t.Object({
  faculties: t.Optional(
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

export const UniversityRelationsInputUpdate = t.Partial(
  t.Object({
    faculties: t.Partial(
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

export const UniversityWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          emblemImageSrc: t.String(),
          name: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "University" },
  ),
);

export const UniversityWhereUnique = t.Recursive(
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
            emblemImageSrc: t.String(),
            name: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "University" },
);

export const UniversitySelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    emblemImageSrc: t.Boolean(),
    name: t.Boolean(),
    faculties: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const UniversityInclude = t.Partial(
  t.Object({ faculties: t.Boolean(), _count: t.Boolean() }),
);

export const UniversityOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    emblemImageSrc: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    name: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const University = t.Composite([UniversityPlain, UniversityRelations]);

export const UniversityInputCreate = t.Composite([
  UniversityPlainInputCreate,
  UniversityRelationsInputCreate,
]);

export const UniversityInputUpdate = t.Composite([
  UniversityPlainInputUpdate,
  UniversityRelationsInputUpdate,
]);
