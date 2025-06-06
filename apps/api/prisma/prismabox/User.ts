import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object({
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
});

export const UserRelations = t.Object({
  student: __nullable__(
    t.Object({
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
  ),
  teacher: __nullable__(
    t.Object({
      id: t.String(),
      universityTeacherId: t.String(),
      identificationNumber: t.String(),
      affiliatedCurriculumId: t.String(),
      userId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
  ),
  admin: __nullable__(
    t.Object({
      id: t.String(),
      userId: t.String(),
      isDeleted: t.Boolean(),
      deletedAt: __nullable__(t.Date()),
    }),
  ),
});

export const UserPlainInputCreate = t.Object({
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
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const UserPlainInputUpdate = t.Object({
  nameTitle: t.Optional(t.String()),
  firstName: t.Optional(t.String()),
  lastName: t.Optional(t.String()),
  email: t.Optional(t.String()),
  password: t.Optional(t.String()),
  sex: t.Optional(
    t.Union([t.Literal("MALE"), t.Literal("FEMALE"), t.Literal("OTHER")]),
  ),
  role: t.Optional(
    t.Union([t.Literal("TEACHER"), t.Literal("STUDENT"), t.Literal("ADMIN")]),
  ),
  isDeleted: t.Optional(t.Boolean()),
  deletedAt: t.Optional(__nullable__(t.Date())),
});

export const UserRelationsInputCreate = t.Object({
  student: t.Optional(
    t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  ),
  teacher: t.Optional(
    t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  ),
  admin: t.Optional(
    t.Object({
      connect: t.Object({
        id: t.String(),
      }),
    }),
  ),
});

export const UserRelationsInputUpdate = t.Partial(
  t.Object({
    student: t.Partial(
      t.Object({
        connect: t.Object({
          id: t.String(),
        }),
        disconnect: t.Boolean(),
      }),
    ),
    teacher: t.Partial(
      t.Object({
        connect: t.Object({
          id: t.String(),
        }),
        disconnect: t.Boolean(),
      }),
    ),
    admin: t.Partial(
      t.Object({
        connect: t.Object({
          id: t.String(),
        }),
        disconnect: t.Boolean(),
      }),
    ),
  }),
);

export const UserWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: true })]),
          OR: t.Array(Self, { additionalProperties: true }),
          id: t.String(),
          nameTitle: t.String(),
          firstName: t.String(),
          lastName: t.String(),
          email: t.String(),
          password: t.String(),
          sex: t.Union([
            t.Literal("MALE"),
            t.Literal("FEMALE"),
            t.Literal("OTHER"),
          ]),
          role: t.Union([
            t.Literal("TEACHER"),
            t.Literal("STUDENT"),
            t.Literal("ADMIN"),
          ]),
          isDeleted: t.Boolean(),
          deletedAt: t.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "User" },
  ),
);

export const UserWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String() },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ email: t.String() })],
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
            nameTitle: t.String(),
            firstName: t.String(),
            lastName: t.String(),
            email: t.String(),
            password: t.String(),
            sex: t.Union([
              t.Literal("MALE"),
              t.Literal("FEMALE"),
              t.Literal("OTHER"),
            ]),
            role: t.Union([
              t.Literal("TEACHER"),
              t.Literal("STUDENT"),
              t.Literal("ADMIN"),
            ]),
            isDeleted: t.Boolean(),
            deletedAt: t.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "User" },
);

export const UserSelect = t.Partial(
  t.Object({
    id: t.Boolean(),
    nameTitle: t.Boolean(),
    firstName: t.Boolean(),
    lastName: t.Boolean(),
    email: t.Boolean(),
    password: t.Boolean(),
    sex: t.Boolean(),
    role: t.Boolean(),
    student: t.Boolean(),
    teacher: t.Boolean(),
    admin: t.Boolean(),
    isDeleted: t.Boolean(),
    deletedAt: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const UserInclude = t.Partial(
  t.Object({
    sex: t.Boolean(),
    role: t.Boolean(),
    student: t.Boolean(),
    teacher: t.Boolean(),
    admin: t.Boolean(),
    _count: t.Boolean(),
  }),
);

export const UserOrderBy = t.Partial(
  t.Object({
    id: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    nameTitle: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    firstName: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    lastName: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    email: t.Union([t.Literal("asc"), t.Literal("desc")], {
      additionalProperties: true,
    }),
    password: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const User = t.Composite([UserPlain, UserRelations]);

export const UserInputCreate = t.Composite([
  UserPlainInputCreate,
  UserRelationsInputCreate,
]);

export const UserInputUpdate = t.Composite([
  UserPlainInputUpdate,
  UserRelationsInputUpdate,
]);
