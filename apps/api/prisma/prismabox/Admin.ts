import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AdminPlain = t.Object({
  id: t.String(),
  userId: t.String(),
  isDeleted: t.Boolean(),
  deletedAt: __nullable__(t.Date()),
});

export const AdminRelations = t.Object({
  user: t.Object({
    id: t.String(),
    nameTitle: t.String(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    password: t.String(),
    sex: t.Union([t.Literal("MALE"), t.Literal("FEMALE"), t.Literal("OTHER")]),
    role: t.Union([
      t.Literal("TEACHER"),
      t.Literal("STUDENT"),
      t.Literal("ADMIN"),
    ]),
    isDeleted: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
  }),
});

export const AdminPlainInputCreate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const AdminPlainInputUpdate = t.Object({
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const AdminRelationsInputCreate = t.Object({
  user: t.Object({
    connect: t.Object({
      id: t.String(),
    }),
  }),
});

export const AdminRelationsInputUpdate = t.Partial(
  t.Object({
    user: t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  }),
);

export const AdminWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          userId: t.String(),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Admin" },
  ),
);

export const AdminWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), userId: t.String() },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ userId: t.String() })],
          { additionalProperties: true },
        ),
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
            userId: t.String(),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Admin" },
);

export const AdminSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    userId: t.Boolean(),
    user: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const AdminInclude = t.Partial(
  t.Object({ user: t.Boolean(), _count: t.Boolean() }),
);

export const AdminOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Admin = t.Composite([AdminPlain, AdminRelations]);

export const AdminInputCreate = t.Composite([
  AdminPlainInputCreate,
  AdminRelationsInputCreate,
]);

export const AdminInputUpdate = t.Composite([
  AdminPlainInputUpdate,
  AdminRelationsInputUpdate,
]);
