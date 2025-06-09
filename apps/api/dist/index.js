"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
module.exports = __toCommonJS(index_exports);
var import_elysia25 = require("elysia");
var import_node = require("@elysiajs/node");

// src/routes/app.route.ts
var import_elysia24 = __toESM(require("elysia"));

// src/routes/auth.route.ts
var import_elysia5 = __toESM(require("elysia"));

// src/middlewares/auth.ts
var import_jwt = __toESM(require("@elysiajs/jwt"));
var import_elysia = __toESM(require("elysia"));

// src/error.ts
var ERROR_RESPONSES = {
  unauthorized: {
    statusCode: 401,
    isSuccess: false,
    error: {
      message: "Unauthorized! Invalid access token."
    },
    data: null
  },
  accessDenied: {
    statusCode: 403,
    isSuccess: false,
    error: {
      message: "Access Denied! You do not have permission to access this resource."
    },
    data: null
  },
  notFound: {
    statusCode: 404,
    isSuccess: false,
    error: {
      message: "Resource not found."
    },
    data: null
  }
};

// src/config/prisma.ts
var prisma_exports = {};
__export(prisma_exports, {
  prisma: () => prisma
});
var import_client = require("@prisma/client");
__reExport(prisma_exports, require("@prisma/client"));
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma || new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/middlewares/auth.ts
var authPlugin = new import_elysia.default({
  name: "middlewares/auth"
}).use(
  (0, import_jwt.default)({
    name: "jwt",
    secret: process.env.JWT_SECRET
  }).macro({
    auth: (options) => ({
      resolve: (_0) => __async(null, [_0], function* ({ jwt: jwt2, cookie: { accessToken }, set, error: error3 }) {
        try {
          const { requireAuth, allowedRoles } = options;
          if (!requireAuth) return;
          if (!accessToken || !accessToken.value) {
            return error3(401, ERROR_RESPONSES.unauthorized);
          }
          const jwtPayload = yield jwt2.verify(accessToken.value);
          if (!jwtPayload) {
            set.status = 401;
            return error3(401, ERROR_RESPONSES.unauthorized);
          }
          if (jwtPayload.exp && jwtPayload.exp < Date.now() / 1e3) {
            set.status = 401;
            return error3(401, ERROR_RESPONSES.unauthorized);
          }
          const dbUser = yield prisma.user.findUnique({
            where: {
              id: jwtPayload.sub
            },
            include: {
              admin: true,
              student: {
                include: {
                  affiliatedCurriculum: {
                    include: {
                      faculty: {
                        include: {
                          university: true
                        }
                      }
                    }
                  }
                }
              },
              teacher: {
                include: {
                  affiliatedCurriculum: {
                    include: {
                      faculty: {
                        include: {
                          university: true
                        }
                      }
                    }
                  }
                }
              }
            }
          });
          if (!dbUser) {
            set.status = 401;
            return error3(401, ERROR_RESPONSES.unauthorized);
          }
          if (allowedRoles && !allowedRoles.includes(dbUser.role)) {
            set.status = 403;
            return error3(401, ERROR_RESPONSES.accessDenied);
          }
          return {
            authUser: dbUser
          };
        } catch (error4) {
          throw error4;
        }
      })
    })
  })
);

// src/schemas/auth.schema.ts
var import_elysia2 = require("elysia");
var userSchema = {
  id: import_elysia2.t.String(),
  nameTitle: import_elysia2.t.String(),
  firstName: import_elysia2.t.String(),
  lastName: import_elysia2.t.String(),
  email: import_elysia2.t.String({ format: "email" }),
  sex: import_elysia2.t.String(),
  role: import_elysia2.t.String()
};
var signInRequestSchema = import_elysia2.t.Object({
  email: import_elysia2.t.String({ format: "email" }),
  password: import_elysia2.t.String()
});
var getMeSchema = import_elysia2.t.Object(__spreadProps(__spreadValues({}, userSchema), {
  student: import_elysia2.t.Nullable(
    import_elysia2.t.Object({
      id: import_elysia2.t.String(),
      universityStudentId: import_elysia2.t.String(),
      identificationNumber: import_elysia2.t.String(),
      birthDate: import_elysia2.t.Date(),
      enrolledDate: import_elysia2.t.Date(),
      affiliatedCurriculumId: import_elysia2.t.String(),
      affiliatedCurriculum: import_elysia2.t.Object({
        degreeName: import_elysia2.t.String(),
        facultyId: import_elysia2.t.String(),
        faculty: import_elysia2.t.Object({
          id: import_elysia2.t.String(),
          name: import_elysia2.t.String(),
          universityId: import_elysia2.t.String(),
          university: import_elysia2.t.Object({
            emblemImageSrc: import_elysia2.t.Optional(import_elysia2.t.String()),
            id: import_elysia2.t.String(),
            name: import_elysia2.t.String()
          })
        }),
        id: import_elysia2.t.String(),
        programName: import_elysia2.t.String()
      }),
      userId: import_elysia2.t.String()
    })
  ),
  teacher: import_elysia2.t.Nullable(
    import_elysia2.t.Object({
      id: import_elysia2.t.String(),
      identificationNumber: import_elysia2.t.String(),
      universityTeacherId: import_elysia2.t.String(),
      userId: import_elysia2.t.String(),
      affiliatedCurriculumId: import_elysia2.t.String(),
      affiliatedCurriculum: import_elysia2.t.Object({
        degreeName: import_elysia2.t.String(),
        facultyId: import_elysia2.t.String(),
        faculty: import_elysia2.t.Object({
          id: import_elysia2.t.String(),
          name: import_elysia2.t.String(),
          universityId: import_elysia2.t.String(),
          university: import_elysia2.t.Object({
            emblemImageSrc: import_elysia2.t.Optional(import_elysia2.t.String()),
            id: import_elysia2.t.String(),
            name: import_elysia2.t.String()
          })
        }),
        id: import_elysia2.t.String(),
        programName: import_elysia2.t.String()
      })
    })
  ),
  admin: import_elysia2.t.Nullable(
    import_elysia2.t.Object({
      id: import_elysia2.t.String(),
      userId: import_elysia2.t.String()
    })
  )
}));

// src/routes/response.ts
var import_elysia3 = require("elysia");
var baseResponseSchema = {
  statusCode: import_elysia3.t.Number(),
  isSuccess: import_elysia3.t.Boolean(),
  error: import_elysia3.t.Null()
};

// src/schemas/response.schema.ts
var import_elysia4 = require("elysia");
var errorResponseSchema = import_elysia4.t.Object({
  statusCode: import_elysia4.t.Number(),
  isSuccess: import_elysia4.t.Boolean(),
  error: import_elysia4.t.Nullable(
    import_elysia4.t.Object({
      message: import_elysia4.t.String()
    })
  ),
  data: import_elysia4.t.Null()
});

// src/routes/auth.route.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/constants/jwt.ts
var ACCESS_TOKEN_EXP = 15 * 60;
var REFRESH_TOKEN_EXP = 24 * 60 * 60;

// src/libs/jwt.ts
function getExpTimestamp(seconds) {
  const currentTimeMillis = Date.now();
  const secondsIntoMillis = seconds * 1e3;
  const expirationTimeMillis = currentTimeMillis + secondsIntoMillis;
  return Math.floor(expirationTimeMillis / 1e3);
}

// src/routes/auth.route.ts
var authRoutes = new import_elysia5.default({
  name: "routes/v1/auth",
  prefix: "/auth",
  tags: ["Auth"]
}).use(authPlugin).guard({
  response: {
    401: errorResponseSchema,
    403: errorResponseSchema
  }
}).post(
  "/signin",
  (_0) => __async(null, [_0], function* ({ body, jwt: jwt2, cookie: { accessToken, refreshToken }, set, error: error3 }) {
    const { email, password } = body;
    const dbUser = yield prisma.user.findUnique({
      where: {
        email
      },
      include: {
        admin: true,
        student: {
          include: {
            affiliatedCurriculum: {
              include: {
                faculty: {
                  include: {
                    university: true
                  }
                }
              }
            }
          }
        },
        teacher: {
          include: {
            affiliatedCurriculum: {
              include: {
                faculty: {
                  include: {
                    university: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!dbUser) {
      return error3("Unauthorized", ERROR_RESPONSES.unauthorized);
    }
    const isPasswordMatch = yield import_bcryptjs.default.compare(password, dbUser.password);
    if (!isPasswordMatch) {
      return error3("Unauthorized", ERROR_RESPONSES.unauthorized);
    }
    const accessJWTToken = yield jwt2.sign({
      sub: dbUser.id,
      iat: Date.now(),
      exp: getExpTimestamp(ACCESS_TOKEN_EXP)
    });
    accessToken.set({
      value: accessJWTToken,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXP,
      path: "/"
    });
    const refreshJWTToken = yield jwt2.sign({
      sub: dbUser.id,
      exp: getExpTimestamp(REFRESH_TOKEN_EXP)
    });
    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXP,
      path: "/"
    });
    return {
      statusCode: 200,
      isSuccess: true,
      error: null,
      data: {
        user: dbUser,
        accessToken: accessJWTToken,
        refreshToken: refreshJWTToken
      }
    };
  }),
  {
    body: signInRequestSchema,
    response: {
      200: import_elysia5.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: import_elysia5.t.Object({
          user: getMeSchema,
          accessToken: import_elysia5.t.String(),
          refreshToken: import_elysia5.t.String()
        })
      }))
    }
  }
).post(
  "/signout",
  (_0) => __async(null, [_0], function* ({ cookie: { accessToken, refreshToken } }) {
    try {
      accessToken.remove();
      refreshToken.remove();
      return {
        statusCode: 200,
        isSuccess: true,
        error: null
      };
    } catch (error3) {
      console.log(error3);
      throw error3;
    }
  }),
  {
    auth: {
      requireAuth: true
    },
    response: {
      200: import_elysia5.t.Object(__spreadValues({}, baseResponseSchema))
    }
  }
).post(
  "/refresh",
  (_0) => __async(null, [_0], function* ({ cookie: { accessToken, refreshToken }, jwt: jwt2, set, error: error3 }) {
    if (!refreshToken.value) {
      return error3(401, ERROR_RESPONSES.unauthorized);
    }
    const jwtPayload = yield jwt2.verify(refreshToken.value);
    if (!jwtPayload || !jwtPayload.sub) {
      return error3(401, ERROR_RESPONSES.unauthorized);
    }
    const userId = jwtPayload.sub;
    const dbUser = yield prisma.user.findUnique({
      where: { id: userId },
      include: {
        admin: true,
        student: {
          include: {
            affiliatedCurriculum: {
              include: {
                faculty: {
                  include: {
                    university: true
                  }
                }
              }
            }
          }
        },
        teacher: {
          include: {
            affiliatedCurriculum: {
              include: {
                faculty: {
                  include: {
                    university: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!dbUser) {
      return error3(401, ERROR_RESPONSES.unauthorized);
    }
    const accessJWTToken = yield jwt2.sign({
      sub: dbUser.id,
      iat: Date.now(),
      exp: getExpTimestamp(ACCESS_TOKEN_EXP)
    });
    accessToken.set({
      value: accessJWTToken,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXP,
      path: "/"
    });
    const refreshJWTToken = yield jwt2.sign({
      sub: dbUser.id,
      exp: getExpTimestamp(REFRESH_TOKEN_EXP)
    });
    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXP,
      path: "/"
    });
    return {
      statusCode: 200,
      isSuccess: true,
      error: null,
      data: {
        user: dbUser,
        accessToken: accessJWTToken,
        refreshToken: refreshJWTToken
      }
    };
  }),
  {
    response: {
      200: import_elysia5.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: import_elysia5.t.Object({
          user: getMeSchema,
          accessToken: import_elysia5.t.String(),
          refreshToken: import_elysia5.t.String()
        })
      }))
    }
  }
).get(
  "/me",
  (_0) => __async(null, [_0], function* ({ authUser }) {
    var _a, _b, _c;
    return {
      statusCode: 200,
      isSuccess: true,
      error: null,
      data: {
        id: authUser.id,
        nameTitle: authUser.nameTitle,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        sex: authUser.sex,
        role: authUser.role,
        student: (_a = authUser.student) != null ? _a : null,
        teacher: (_b = authUser.teacher) != null ? _b : null,
        admin: (_c = authUser.admin) != null ? _c : null
      }
    };
  }),
  {
    auth: {
      requireAuth: true
    },
    response: {
      200: import_elysia5.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: getMeSchema
      }))
    }
  }
);

// src/routes/faculties.route.ts
var import_elysia6 = __toESM(require("elysia"));
var facultiesRoutes = new import_elysia6.default({
  name: "routes/v1/faculties",
  prefix: "/faculties",
  tags: ["faculties"]
}).use(authPlugin).guard({
  response: {
    401: errorResponseSchema,
    403: errorResponseSchema
  }
}).get(
  "/",
  () => __async(null, null, function* () {
    const faculties = yield prisma.faculty.findMany({
      include: {
        curriculums: {
          orderBy: {
            programName: "asc"
          }
        }
      },
      orderBy: {
        name: "asc"
      }
    });
    return {
      statusCode: 200,
      isSuccess: true,
      data: faculties.map((faculty) => ({
        id: faculty.id,
        name: faculty.name,
        universityId: faculty.universityId,
        curriculums: faculty.curriculums.map((c) => ({
          id: c.id,
          degreeName: c.degreeName,
          programName: c.programName,
          facultyId: c.facultyId
        }))
      })),
      error: null
    };
  }),
  {
    response: {
      200: import_elysia6.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: import_elysia6.t.Array(
          import_elysia6.t.Object({
            id: import_elysia6.t.String(),
            name: import_elysia6.t.String(),
            universityId: import_elysia6.t.String(),
            curriculums: import_elysia6.t.Array(
              import_elysia6.t.Object({
                id: import_elysia6.t.String(),
                degreeName: import_elysia6.t.String(),
                programName: import_elysia6.t.String(),
                facultyId: import_elysia6.t.String()
              })
            )
          })
        )
      }))
    }
  }
);

// src/routes/courses.route.ts
var import_elysia19 = __toESM(require("elysia"));

// src/schemas/curriculum.schema.ts
var import_elysia7 = require("elysia");
var curriculumResponseSchema = import_elysia7.t.Object({
  id: import_elysia7.t.String(),
  degreeName: import_elysia7.t.String(),
  programName: import_elysia7.t.String(),
  facultyId: import_elysia7.t.String(),
  courses: import_elysia7.t.Array(
    import_elysia7.t.Object({
      id: import_elysia7.t.String(),
      skillMappingRefId: import_elysia7.t.String(),
      courseCode: import_elysia7.t.String(),
      nameTh: import_elysia7.t.String(),
      nameEn: import_elysia7.t.String(),
      descriptionTh: import_elysia7.t.String(),
      descriptionEn: import_elysia7.t.String(),
      curriculumId: import_elysia7.t.String(),
      teachers: import_elysia7.t.Array(
        import_elysia7.t.Object({
          universityTeacherId: import_elysia7.t.String(),
          identificationNumber: import_elysia7.t.String(),
          affiliatedCurriculumId: import_elysia7.t.String(),
          userId: import_elysia7.t.String(),
          user: import_elysia7.t.Object(__spreadValues({}, userSchema))
        })
      )
    })
  )
});

// src/schemas/courses.schema.ts
var import_elysia18 = require("elysia");

// prisma/prismabox/CourseGradingCriteria.ts
var import_elysia9 = require("elysia");

// prisma/prismabox/__nullable__.ts
var import_elysia8 = require("elysia");
var __nullable__ = (schema) => import_elysia8.t.Union([import_elysia8.t.Null(), schema]);

// prisma/prismabox/CourseGradingCriteria.ts
var CourseGradingCriteriaPlain = import_elysia9.t.Object({
  id: import_elysia9.t.String(),
  courseId: import_elysia9.t.String(),
  grade: import_elysia9.t.Union([
    import_elysia9.t.Literal("A"),
    import_elysia9.t.Literal("B_PLUS"),
    import_elysia9.t.Literal("B"),
    import_elysia9.t.Literal("C_PLUS"),
    import_elysia9.t.Literal("C"),
    import_elysia9.t.Literal("D_PLUS"),
    import_elysia9.t.Literal("D"),
    import_elysia9.t.Literal("F"),
    import_elysia9.t.Literal("X")
  ]),
  minScore: import_elysia9.t.Number(),
  maxScore: import_elysia9.t.Number(),
  isDeleted: import_elysia9.t.Boolean(),
  deletedAt: __nullable__(import_elysia9.t.Date())
});
var CourseGradingCriteriaRelations = import_elysia9.t.Object({
  course: import_elysia9.t.Object({
    id: import_elysia9.t.String(),
    skillMappingRefId: import_elysia9.t.String(),
    courseCode: import_elysia9.t.String(),
    nameEn: import_elysia9.t.String(),
    nameTh: import_elysia9.t.String(),
    descriptionEn: import_elysia9.t.String(),
    descriptionTh: import_elysia9.t.String(),
    curriculumId: import_elysia9.t.String(),
    isDeleted: import_elysia9.t.Boolean(),
    deletedAt: __nullable__(import_elysia9.t.Date())
  })
});
var CourseGradingCriteriaPlainInputCreate = import_elysia9.t.Object({
  grade: import_elysia9.t.Union([
    import_elysia9.t.Literal("A"),
    import_elysia9.t.Literal("B_PLUS"),
    import_elysia9.t.Literal("B"),
    import_elysia9.t.Literal("C_PLUS"),
    import_elysia9.t.Literal("C"),
    import_elysia9.t.Literal("D_PLUS"),
    import_elysia9.t.Literal("D"),
    import_elysia9.t.Literal("F"),
    import_elysia9.t.Literal("X")
  ]),
  minScore: import_elysia9.t.Number(),
  maxScore: import_elysia9.t.Number(),
  isDeleted: import_elysia9.t.Optional(import_elysia9.t.Boolean()),
  deletedAt: import_elysia9.t.Optional(__nullable__(import_elysia9.t.Date()))
});
var CourseGradingCriteriaPlainInputUpdate = import_elysia9.t.Object({
  grade: import_elysia9.t.Optional(
    import_elysia9.t.Union([
      import_elysia9.t.Literal("A"),
      import_elysia9.t.Literal("B_PLUS"),
      import_elysia9.t.Literal("B"),
      import_elysia9.t.Literal("C_PLUS"),
      import_elysia9.t.Literal("C"),
      import_elysia9.t.Literal("D_PLUS"),
      import_elysia9.t.Literal("D"),
      import_elysia9.t.Literal("F"),
      import_elysia9.t.Literal("X")
    ])
  ),
  minScore: import_elysia9.t.Optional(import_elysia9.t.Number()),
  maxScore: import_elysia9.t.Optional(import_elysia9.t.Number()),
  isDeleted: import_elysia9.t.Optional(import_elysia9.t.Boolean()),
  deletedAt: import_elysia9.t.Optional(__nullable__(import_elysia9.t.Date()))
});
var CourseGradingCriteriaRelationsInputCreate = import_elysia9.t.Object({
  course: import_elysia9.t.Object({
    connect: import_elysia9.t.Object({
      id: import_elysia9.t.String()
    })
  })
});
var CourseGradingCriteriaRelationsInputUpdate = import_elysia9.t.Partial(
  import_elysia9.t.Object({
    course: import_elysia9.t.Object({
      connect: import_elysia9.t.Object({
        id: import_elysia9.t.String()
      })
    })
  })
);
var CourseGradingCriteriaWhere = import_elysia9.t.Partial(
  import_elysia9.t.Recursive(
    (Self) => import_elysia9.t.Object(
      {
        AND: import_elysia9.t.Union([Self, import_elysia9.t.Array(Self, { additionalProperties: true })]),
        NOT: import_elysia9.t.Union([Self, import_elysia9.t.Array(Self, { additionalProperties: true })]),
        OR: import_elysia9.t.Array(Self, { additionalProperties: true }),
        id: import_elysia9.t.String(),
        courseId: import_elysia9.t.String(),
        grade: import_elysia9.t.Union([
          import_elysia9.t.Literal("A"),
          import_elysia9.t.Literal("B_PLUS"),
          import_elysia9.t.Literal("B"),
          import_elysia9.t.Literal("C_PLUS"),
          import_elysia9.t.Literal("C"),
          import_elysia9.t.Literal("D_PLUS"),
          import_elysia9.t.Literal("D"),
          import_elysia9.t.Literal("F"),
          import_elysia9.t.Literal("X")
        ]),
        minScore: import_elysia9.t.Number(),
        maxScore: import_elysia9.t.Number(),
        isDeleted: import_elysia9.t.Boolean(),
        deletedAt: import_elysia9.t.Date()
      },
      { additionalProperties: true }
    ),
    { $id: "CourseGradingCriteria" }
  )
);
var CourseGradingCriteriaWhereUnique = import_elysia9.t.Recursive(
  (Self) => import_elysia9.t.Intersect(
    [
      import_elysia9.t.Partial(
        import_elysia9.t.Object({ id: import_elysia9.t.String() }, { additionalProperties: true }),
        { additionalProperties: true }
      ),
      import_elysia9.t.Union([import_elysia9.t.Object({ id: import_elysia9.t.String() })], { additionalProperties: true }),
      import_elysia9.t.Partial(
        import_elysia9.t.Object({
          AND: import_elysia9.t.Union([Self, import_elysia9.t.Array(Self, { additionalProperties: true })]),
          NOT: import_elysia9.t.Union([Self, import_elysia9.t.Array(Self, { additionalProperties: true })]),
          OR: import_elysia9.t.Array(Self, { additionalProperties: true })
        }),
        { additionalProperties: true }
      ),
      import_elysia9.t.Partial(
        import_elysia9.t.Object({
          id: import_elysia9.t.String(),
          courseId: import_elysia9.t.String(),
          grade: import_elysia9.t.Union([
            import_elysia9.t.Literal("A"),
            import_elysia9.t.Literal("B_PLUS"),
            import_elysia9.t.Literal("B"),
            import_elysia9.t.Literal("C_PLUS"),
            import_elysia9.t.Literal("C"),
            import_elysia9.t.Literal("D_PLUS"),
            import_elysia9.t.Literal("D"),
            import_elysia9.t.Literal("F"),
            import_elysia9.t.Literal("X")
          ]),
          minScore: import_elysia9.t.Number(),
          maxScore: import_elysia9.t.Number(),
          isDeleted: import_elysia9.t.Boolean(),
          deletedAt: import_elysia9.t.Date()
        })
      )
    ],
    { additionalProperties: true }
  ),
  { $id: "CourseGradingCriteria" }
);
var CourseGradingCriteriaSelect = import_elysia9.t.Partial(
  import_elysia9.t.Object({
    id: import_elysia9.t.Boolean(),
    courseId: import_elysia9.t.Boolean(),
    course: import_elysia9.t.Boolean(),
    grade: import_elysia9.t.Boolean(),
    minScore: import_elysia9.t.Boolean(),
    maxScore: import_elysia9.t.Boolean(),
    isDeleted: import_elysia9.t.Boolean(),
    deletedAt: import_elysia9.t.Boolean(),
    _count: import_elysia9.t.Boolean()
  })
);
var CourseGradingCriteriaInclude = import_elysia9.t.Partial(
  import_elysia9.t.Object({ course: import_elysia9.t.Boolean(), grade: import_elysia9.t.Boolean(), _count: import_elysia9.t.Boolean() })
);
var CourseGradingCriteriaOrderBy = import_elysia9.t.Partial(
  import_elysia9.t.Object({
    id: import_elysia9.t.Union([import_elysia9.t.Literal("asc"), import_elysia9.t.Literal("desc")], {
      additionalProperties: true
    }),
    courseId: import_elysia9.t.Union([import_elysia9.t.Literal("asc"), import_elysia9.t.Literal("desc")], {
      additionalProperties: true
    }),
    minScore: import_elysia9.t.Union([import_elysia9.t.Literal("asc"), import_elysia9.t.Literal("desc")], {
      additionalProperties: true
    }),
    maxScore: import_elysia9.t.Union([import_elysia9.t.Literal("asc"), import_elysia9.t.Literal("desc")], {
      additionalProperties: true
    }),
    isDeleted: import_elysia9.t.Union([import_elysia9.t.Literal("asc"), import_elysia9.t.Literal("desc")], {
      additionalProperties: true
    }),
    deletedAt: import_elysia9.t.Union([import_elysia9.t.Literal("asc"), import_elysia9.t.Literal("desc")], {
      additionalProperties: true
    })
  })
);
var CourseGradingCriteria = import_elysia9.t.Composite([
  CourseGradingCriteriaPlain,
  CourseGradingCriteriaRelations
]);
var CourseGradingCriteriaInputCreate = import_elysia9.t.Composite([
  CourseGradingCriteriaPlainInputCreate,
  CourseGradingCriteriaRelationsInputCreate
]);
var CourseGradingCriteriaInputUpdate = import_elysia9.t.Composite([
  CourseGradingCriteriaPlainInputUpdate,
  CourseGradingCriteriaRelationsInputUpdate
]);

// src/schemas/base.schema.ts
var import_elysia10 = require("elysia");
var softDeleteBaseSchema = {
  isDeleted: import_elysia10.t.Boolean(),
  deletedAt: import_elysia10.t.Nullable(import_elysia10.t.Date())
};

// src/schemas/skills.schema.ts
var import_elysia14 = require("elysia");

// src/schemas/clos.schema.ts
var import_elysia12 = require("elysia");

// prisma/prismabox/CloType.ts
var import_elysia11 = require("elysia");
var CloType = import_elysia11.t.Union([
  import_elysia11.t.Literal("K"),
  import_elysia11.t.Literal("S"),
  import_elysia11.t.Literal("A")
]);

// src/schemas/clos.schema.ts
var cloBaseSchema = __spreadValues({
  id: import_elysia12.t.String(),
  type: CloType,
  name: import_elysia12.t.String()
}, softDeleteBaseSchema);

// prisma/prismabox/SkillType.ts
var import_elysia13 = require("elysia");
var SkillType = import_elysia13.t.Union([
  import_elysia13.t.Literal("SPECIFIC"),
  import_elysia13.t.Literal("GENERAL"),
  import_elysia13.t.Literal("MAIN"),
  import_elysia13.t.Literal("OTHER")
]);

// src/schemas/skills.schema.ts
var cloSkillLevelCriteriaBaseSchema = __spreadValues({
  id: import_elysia14.t.String(),
  courseId: import_elysia14.t.String(),
  cloId: import_elysia14.t.String(),
  clo: import_elysia14.t.Object(__spreadValues({}, cloBaseSchema)),
  skillLevelCriteriaId: import_elysia14.t.String()
}, softDeleteBaseSchema);
var skillLevelMethodBaseSchema = __spreadValues({
  id: import_elysia14.t.String(),
  skillLevelId: import_elysia14.t.String(),
  methodNameTh: import_elysia14.t.String(),
  methodNameEn: import_elysia14.t.String()
}, softDeleteBaseSchema);
var skillLevelCriteriaBaseSchema = __spreadValues({
  id: import_elysia14.t.String(),
  skillLevelId: import_elysia14.t.String(),
  criteriaNameTh: import_elysia14.t.String(),
  criteriaNameEn: import_elysia14.t.String(),
  cloSkillLevelCriterias: import_elysia14.t.Array(import_elysia14.t.Object(__spreadValues({}, cloSkillLevelCriteriaBaseSchema)))
}, softDeleteBaseSchema);
var skillLevelBaseSchema = __spreadValues({
  id: import_elysia14.t.String(),
  skillId: import_elysia14.t.String(),
  level: import_elysia14.t.Number(),
  descriptionTh: import_elysia14.t.String(),
  descriptionEn: import_elysia14.t.String(),
  methods: import_elysia14.t.Array(import_elysia14.t.Object(__spreadValues({}, skillLevelMethodBaseSchema))),
  criterias: import_elysia14.t.Array(import_elysia14.t.Object(__spreadValues({}, skillLevelCriteriaBaseSchema)))
}, softDeleteBaseSchema);
var skillBaseSchema = __spreadValues({
  id: import_elysia14.t.String(),
  skillMappingRefId: import_elysia14.t.String(),
  nameTh: import_elysia14.t.String(),
  nameEn: import_elysia14.t.String(),
  descriptionTh: import_elysia14.t.String(),
  descriptionEn: import_elysia14.t.String(),
  type: SkillType,
  isMainSkill: import_elysia14.t.Boolean(),
  skillLevels: import_elysia14.t.Array(import_elysia14.t.Object(__spreadValues({}, skillLevelBaseSchema)))
}, softDeleteBaseSchema);

// src/schemas/gradings.schema.ts
var import_elysia17 = require("elysia");

// prisma/prismabox/Grade.ts
var import_elysia15 = require("elysia");
var Grade = import_elysia15.t.Union([
  import_elysia15.t.Literal("A"),
  import_elysia15.t.Literal("B_PLUS"),
  import_elysia15.t.Literal("B"),
  import_elysia15.t.Literal("C_PLUS"),
  import_elysia15.t.Literal("C"),
  import_elysia15.t.Literal("D_PLUS"),
  import_elysia15.t.Literal("D"),
  import_elysia15.t.Literal("F"),
  import_elysia15.t.Literal("X")
]);

// prisma/prismabox/GradingResult.ts
var import_elysia16 = require("elysia");
var GradingResult = import_elysia16.t.Union([
  import_elysia16.t.Literal("FAIL"),
  import_elysia16.t.Literal("PASS"),
  import_elysia16.t.Literal("GOOD"),
  import_elysia16.t.Literal("VERY_GOOD"),
  import_elysia16.t.Literal("EXCELLENT"),
  import_elysia16.t.Literal("X")
]);

// src/schemas/gradings.schema.ts
var studentCourseGradingBaseSchema = __spreadValues({
  id: import_elysia17.t.String(),
  studentCourseId: import_elysia17.t.String(),
  gradingDate: import_elysia17.t.Nullable(import_elysia17.t.Date()),
  grade: Grade,
  score: import_elysia17.t.Number()
}, softDeleteBaseSchema);
var gradingCloResultBaseSchema = __spreadValues({
  id: import_elysia17.t.String(),
  studentCourseGradingId: import_elysia17.t.String(),
  cloId: import_elysia17.t.String(),
  result: GradingResult,
  index: import_elysia17.t.Number()
}, softDeleteBaseSchema);
var courseCloWeightBaseSchema = __spreadValues({
  id: import_elysia17.t.String(),
  courseId: import_elysia17.t.String(),
  cloId: import_elysia17.t.String(),
  weight: import_elysia17.t.Number()
}, softDeleteBaseSchema);
var cloWeightSettingsRequestSchema = import_elysia17.t.Array(
  import_elysia17.t.Object({
    courseCloWeightId: import_elysia17.t.String(),
    weight: import_elysia17.t.Number()
  })
);
var cloWeightSettingsResponseSchema = import_elysia17.t.Array(
  import_elysia17.t.Object({
    courseCloWeightId: import_elysia17.t.String(),
    weight: import_elysia17.t.Number()
  })
);
var gradingCriteriaRequestSchema = import_elysia17.t.Array(
  import_elysia17.t.Object({
    courseGradingCriteriaId: import_elysia17.t.String(),
    minScore: import_elysia17.t.Number(),
    maxScore: import_elysia17.t.Number()
  })
);
var gradingCriteriaResponseSchema = import_elysia17.t.Array(
  import_elysia17.t.Object({
    courseGradingCriteriaId: import_elysia17.t.String(),
    minScore: import_elysia17.t.Number(),
    maxScore: import_elysia17.t.Number()
  })
);
var studentGradingRequestSchema = import_elysia17.t.Object({
  courseId: import_elysia17.t.String(),
  studentId: import_elysia17.t.String(),
  cloId: import_elysia17.t.String(),
  grade: GradingResult
});
var studentGradingResponseSchema = import_elysia17.t.Object({
  courseId: import_elysia17.t.String(),
  studentId: import_elysia17.t.String(),
  cloId: import_elysia17.t.String(),
  grade: GradingResult
});
var gradeAnnouncementRequestSchema = import_elysia17.t.Object({
  courseId: import_elysia17.t.String()
});

// src/schemas/courses.schema.ts
var createCourseRequestSchema = import_elysia18.t.Object({
  courseCode: import_elysia18.t.String(),
  nameTh: import_elysia18.t.String(),
  nameEn: import_elysia18.t.String(),
  descriptionTh: import_elysia18.t.String(),
  descriptionEn: import_elysia18.t.String(),
  teacherId: import_elysia18.t.String(),
  curriculumId: import_elysia18.t.String()
});
var studentWithUserSchema = import_elysia18.t.Object({
  id: import_elysia18.t.String(),
  userId: import_elysia18.t.String(),
  universityStudentId: import_elysia18.t.String(),
  identificationNumber: import_elysia18.t.String(),
  affiliatedCurriculumId: import_elysia18.t.String(),
  isDeleted: import_elysia18.t.Boolean(),
  deletedAt: import_elysia18.t.Nullable(import_elysia18.t.Date()),
  birthDate: import_elysia18.t.Date(),
  enrolledDate: import_elysia18.t.Date(),
  grading: import_elysia18.t.Nullable(
    import_elysia18.t.Object(__spreadProps(__spreadValues({}, studentCourseGradingBaseSchema), {
      gradingCloResults: import_elysia18.t.Array(
        import_elysia18.t.Object(__spreadProps(__spreadValues({}, gradingCloResultBaseSchema), {
          clo: import_elysia18.t.Object(__spreadValues({}, cloBaseSchema))
        }))
      )
    }))
  ),
  user: import_elysia18.t.Nullable(
    import_elysia18.t.Object({
      id: import_elysia18.t.String(),
      email: import_elysia18.t.String(),
      firstName: import_elysia18.t.String(),
      lastName: import_elysia18.t.String()
    })
  )
});
var courseCloBaseSchema = __spreadValues({
  id: import_elysia18.t.String(),
  courseId: import_elysia18.t.String(),
  cloId: import_elysia18.t.String(),
  index: import_elysia18.t.Number()
}, softDeleteBaseSchema);
var courseBaseSchema = __spreadValues({
  id: import_elysia18.t.String(),
  skillMappingRefId: import_elysia18.t.String(),
  courseCode: import_elysia18.t.String(),
  nameTh: import_elysia18.t.String(),
  nameEn: import_elysia18.t.String(),
  descriptionTh: import_elysia18.t.String(),
  descriptionEn: import_elysia18.t.String(),
  curriculumId: import_elysia18.t.String()
}, softDeleteBaseSchema);
var courseDetailSchema = import_elysia18.t.Object(__spreadValues({
  id: import_elysia18.t.String(),
  skillMappingRefId: import_elysia18.t.String(),
  courseCode: import_elysia18.t.String(),
  nameTh: import_elysia18.t.String(),
  nameEn: import_elysia18.t.String(),
  descriptionTh: import_elysia18.t.String(),
  descriptionEn: import_elysia18.t.String(),
  curriculumId: import_elysia18.t.String(),
  gradingCriterias: import_elysia18.t.Array(CourseGradingCriteriaPlain),
  clos: import_elysia18.t.Array(
    import_elysia18.t.Object(__spreadProps(__spreadValues({}, courseCloBaseSchema), {
      clo: import_elysia18.t.Object(__spreadValues({}, cloBaseSchema)),
      cloWeights: import_elysia18.t.Nullable(import_elysia18.t.Object(__spreadValues({}, courseCloWeightBaseSchema)))
    }))
  ),
  students: import_elysia18.t.Array(studentWithUserSchema),
  skills: import_elysia18.t.Array(import_elysia18.t.Object(__spreadValues({}, skillBaseSchema)))
}, softDeleteBaseSchema));

// src/routes/courses.route.ts
var coursesRoutes = new import_elysia19.default({
  name: "routes/v1/courses",
  prefix: "/courses",
  tags: ["courses"]
}).use(authPlugin).guard({
  response: {
    401: errorResponseSchema,
    403: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema
  }
}).get(
  "/curriculums/:curriculumId",
  (_0) => __async(null, [_0], function* ({ params, error: error3 }) {
    try {
      const { curriculumId } = params;
      const curriculum = yield prisma.curriculum.findFirst({
        where: {
          AND: [
            {
              id: curriculumId,
              isDeleted: false
            }
          ]
        },
        include: {
          courses: {
            where: { isDeleted: false },
            include: {
              teachers: {
                where: { isDeleted: false },
                select: {
                  teacherId: true,
                  teacher: {
                    include: {
                      user: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      if (!curriculum) {
        return error3("Not Found", ERROR_RESPONSES.notFound);
      }
      const mappedData = {
        id: curriculum.id,
        degreeName: curriculum.degreeName,
        programName: curriculum.programName,
        facultyId: curriculum.facultyId,
        courses: curriculum.courses.map((course) => ({
          id: course.id,
          skillMappingRefId: course.skillMappingRefId,
          courseCode: course.courseCode,
          nameTh: course.nameTh,
          nameEn: course.nameEn,
          descriptionTh: course.descriptionTh,
          descriptionEn: course.descriptionEn,
          curriculumId: course.curriculumId,
          teachers: course.teachers.map((teacher) => ({
            universityTeacherId: teacher.teacherId,
            identificationNumber: teacher.teacher.identificationNumber,
            affiliatedCurriculumId: teacher.teacher.affiliatedCurriculumId,
            userId: teacher.teacher.userId,
            user: teacher.teacher.user
          }))
        }))
      };
      return {
        statusCode: 200,
        isSuccess: true,
        data: mappedData,
        error: null
      };
    } catch (error4) {
      console.error("Error fetching curriculum courses:", error4);
      return {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: error4 instanceof Error ? error4.message : "Internal Server Error"
        },
        data: null
      };
    }
  }),
  {
    response: {
      200: import_elysia19.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: curriculumResponseSchema
      }))
    }
  }
).get(
  "/:id",
  (_0) => __async(null, [_0], function* ({ params, error: error3 }) {
    const { id } = params;
    try {
      const course = yield prisma.course.findUnique({
        where: {
          id
        },
        include: {
          gradingCriterias: {
            where: { isDeleted: false }
          },
          clos: {
            where: { isDeleted: false },
            include: {
              clo: true
            },
            orderBy: {
              index: "asc"
            }
          },
          students: {
            where: { isDeleted: false },
            include: {
              student: {
                include: {
                  user: true
                }
              }
            }
          },
          cloWeights: {
            where: { isDeleted: false }
          }
        }
      });
      if (!course) {
        return error3("Not Found", ERROR_RESPONSES.notFound);
      }
      const studentGradings = yield prisma.studentCourseGrading.findMany({
        where: {
          AND: [
            {
              studentCourse: {
                courseId: course.id
              },
              isDeleted: false
            }
          ]
        },
        include: {
          studentCourse: {
            include: {
              student: true
            }
          },
          gradingCloResults: {
            where: { isDeleted: false },
            include: {
              clo: true
            },
            orderBy: {
              index: "asc"
            }
          }
        }
      });
      if (!studentGradings) {
        return error3("Not Found", ERROR_RESPONSES.notFound);
      }
      const courseSkills = yield prisma.courseSkill.findMany({
        where: {
          course: {
            id: course.id
          }
        },
        include: {
          skill: {
            include: {
              skillLevels: {
                where: { isDeleted: false },
                include: {
                  methods: {
                    where: { isDeleted: false }
                  },
                  criterias: {
                    where: { isDeleted: false },
                    include: {
                      cloSkillLevelCriterias: {
                        where: { isDeleted: false, courseId: course.id },
                        include: {
                          clo: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      const mappedData = __spreadProps(__spreadValues({}, course), {
        gradingCriterias: course.gradingCriterias,
        clos: course.clos.map((clo) => __spreadProps(__spreadValues({}, clo), {
          cloWeights: course.cloWeights.find((cw) => cw.cloId === clo.clo.id) || null
        })),
        students: course.students.map((s) => {
          var _a;
          return {
            id: s.student.id,
            userId: s.student.userId,
            universityStudentId: s.student.universityStudentId,
            identificationNumber: s.student.identificationNumber,
            affiliatedCurriculumId: s.student.affiliatedCurriculumId,
            isDeleted: s.student.isDeleted,
            deletedAt: s.student.deletedAt,
            birthDate: s.student.birthDate,
            enrolledDate: s.student.enrolledDate,
            user: (_a = s.student.user) != null ? _a : null,
            grading: studentGradings.find((sg) => sg.studentCourse.studentId === s.student.id) || null
          };
        }),
        skills: courseSkills.map((cs) => cs.skill)
      });
      return {
        statusCode: 200,
        isSuccess: true,
        data: mappedData,
        error: null
      };
    } catch (err) {
      console.error("Error fetching course:", err);
      return error3("Internal Server Error", {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error"
        },
        data: null
      });
    }
  }),
  {
    response: {
      200: import_elysia19.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: courseDetailSchema
      }))
    }
  }
).post(
  "/",
  (_0) => __async(null, [_0], function* ({ body, error: error3 }) {
    const { courseCode, nameTh, nameEn, descriptionTh, descriptionEn, teacherId, curriculumId } = body;
    try {
      let gradingCloIndex = -1;
      let cloIndex = -1;
      yield prisma.$transaction((tx) => __async(null, null, function* () {
        const course = yield tx.course.create({
          data: {
            skillMappingRefId: courseCode,
            courseCode,
            nameEn,
            nameTh,
            descriptionEn,
            descriptionTh,
            curriculum: {
              connect: {
                id: curriculumId
              }
            }
          }
        });
        const courseSection = yield tx.courseSection.create({
          data: {
            course: {
              connect: {
                id: course.id
              }
            },
            section: "1"
          }
        });
        yield tx.courseGradingCriteria.createMany({
          data: [
            {
              courseId: course.id,
              grade: "A",
              minScore: 0,
              maxScore: 0
            },
            {
              courseId: course.id,
              grade: "B_PLUS",
              minScore: 0,
              maxScore: 0
            },
            {
              courseId: course.id,
              grade: "B",
              minScore: 0,
              maxScore: 0
            },
            {
              courseId: course.id,
              grade: "C_PLUS",
              minScore: 0,
              maxScore: 0
            },
            {
              courseId: course.id,
              grade: "C",
              minScore: 0,
              maxScore: 0
            },
            {
              courseId: course.id,
              grade: "D_PLUS",
              minScore: 0,
              maxScore: 0
            },
            {
              courseId: course.id,
              grade: "D",
              minScore: 0,
              maxScore: 0
            },
            {
              courseId: course.id,
              grade: "F",
              minScore: 0,
              maxScore: 0
            }
          ]
        });
        const cloId = [
          crypto.randomUUID(),
          crypto.randomUUID(),
          crypto.randomUUID(),
          crypto.randomUUID(),
          crypto.randomUUID(),
          crypto.randomUUID()
        ];
        const skillId = [
          crypto.randomUUID(),
          crypto.randomUUID(),
          crypto.randomUUID(),
          crypto.randomUUID(),
          crypto.randomUUID()
        ];
        yield tx.clo.createMany({
          data: [
            {
              id: cloId[5],
              type: "A",
              name: "MOCK_CLO_A"
            },
            {
              id: cloId[4],
              type: "A",
              name: "MOCK_CLO_B"
            },
            {
              id: cloId[3],
              type: "K",
              name: "MOCK_CLO_C"
            },
            {
              id: cloId[0],
              type: "S",
              name: "\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E20\u0E32\u0E29\u0E32 Python"
            },
            {
              id: cloId[1],
              type: "S",
              name: "\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E20\u0E32\u0E29\u0E32 C"
            },
            {
              id: cloId[2],
              type: "S",
              name: "\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E20\u0E32\u0E29\u0E32 Java"
            }
          ]
        });
        yield tx.courseClo.createMany({
          data: [
            {
              cloId: cloId[0],
              courseId: course.id,
              index: cloIndex += 1
            },
            {
              cloId: cloId[1],
              courseId: course.id,
              index: cloIndex += 1
            },
            {
              cloId: cloId[2],
              courseId: course.id,
              index: cloIndex += 1
            },
            {
              cloId: cloId[3],
              courseId: course.id,
              index: cloIndex += 1
            },
            {
              cloId: cloId[4],
              courseId: course.id,
              index: cloIndex += 1
            },
            {
              cloId: cloId[5],
              courseId: course.id,
              index: cloIndex += 1
            }
          ]
        });
        yield tx.courseCloWeight.createMany({
          data: [
            {
              courseId: course.id,
              cloId: cloId[0],
              weight: 0
            },
            {
              courseId: course.id,
              cloId: cloId[1],
              weight: 0
            },
            {
              courseId: course.id,
              cloId: cloId[2],
              weight: 0
            },
            {
              courseId: course.id,
              cloId: cloId[3],
              weight: 0
            },
            {
              courseId: course.id,
              cloId: cloId[4],
              weight: 0
            },
            {
              courseId: course.id,
              cloId: cloId[5],
              weight: 0
            }
          ]
        });
        const skills = yield tx.skill.create({
          data: {
            skillMappingRefId: "0",
            nameTh: "\u0E01\u0E32\u0E23\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E04\u0E2D\u0E21\u0E1E\u0E34\u0E27\u0E40\u0E15\u0E2D\u0E23\u0E4C",
            nameEn: "Computer Programming",
            descriptionTh: "\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E04\u0E2D\u0E21\u0E1E\u0E34\u0E27\u0E40\u0E15\u0E2D\u0E23\u0E4C",
            descriptionEn: "Description of Computer Programming",
            type: "SPECIFIC",
            id: skillId[0]
          }
        });
        yield tx.courseSkill.create({
          data: {
            course: {
              connect: {
                id: course.id
              }
            },
            skill: {
              connect: {
                id: skills.id
              }
            }
          }
        });
        const skillLevel1 = yield tx.skillLevel.create({
          data: {
            level: 1,
            descriptionTh: "\u0E23\u0E30\u0E14\u0E31\u0E1A 1: \u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19",
            descriptionEn: "Level 1: Basic",
            skill: {
              connect: {
                id: skills.id
              }
            }
          }
        });
        const skillLevel2 = yield tx.skillLevel.create({
          data: {
            level: 2,
            descriptionTh: "\u0E23\u0E30\u0E14\u0E31\u0E1A 2: \u0E02\u0E31\u0E49\u0E19\u0E01\u0E25\u0E32\u0E07",
            descriptionEn: "Level 2: Intermediate",
            skill: {
              connect: {
                id: skills.id
              }
            }
          }
        });
        const skillLevel3 = yield tx.skillLevel.create({
          data: {
            level: 3,
            descriptionTh: "\u0E23\u0E30\u0E14\u0E31\u0E1A 3: \u0E02\u0E31\u0E49\u0E19\u0E2A\u0E39\u0E07",
            descriptionEn: "Level 3: Advanced",
            skill: {
              connect: {
                id: skills.id
              }
            }
          }
        });
        const skillLevelCriteria1 = yield tx.skillLevelCriteria.create({
          data: {
            skillLevel: {
              connect: {
                id: skillLevel1.id
              }
            },
            criteriaNameTh: "\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E20\u0E32\u0E29\u0E32 Python \u0E44\u0E14\u0E49",
            criteriaNameEn: "Able to write Python programs"
          }
        });
        const skillLevelCriteria2 = yield tx.skillLevelCriteria.create({
          data: {
            skillLevel: {
              connect: {
                id: skillLevel2.id
              }
            },
            criteriaNameTh: "\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E20\u0E32\u0E29\u0E32 Python \u0E41\u0E25\u0E30 C \u0E44\u0E14\u0E49\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E",
            criteriaNameEn: "Able to write efficient Python and C programs"
          }
        });
        const skillLevelCriteria3 = yield tx.skillLevelCriteria.create({
          data: {
            skillLevel: {
              connect: {
                id: skillLevel3.id
              }
            },
            criteriaNameTh: "\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E20\u0E32\u0E29\u0E32 Python, C \u0E41\u0E25\u0E30 Java \u0E44\u0E14\u0E49\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E",
            criteriaNameEn: "Able to write efficient Python, C, and Java programs"
          }
        });
        yield tx.cloSkillLevelCriteria.create({
          data: {
            course: {
              connect: {
                id: course.id
              }
            },
            clo: {
              connect: {
                id: cloId[0]
              }
            },
            skillLevelCriteria: {
              connect: {
                id: skillLevelCriteria1.id
              }
            }
          }
        });
        yield tx.cloSkillLevelCriteria.createMany({
          data: [
            {
              courseId: course.id,
              cloId: cloId[0],
              skillLevelCriteriaId: skillLevelCriteria2.id
            },
            {
              courseId: course.id,
              cloId: cloId[1],
              skillLevelCriteriaId: skillLevelCriteria2.id
            }
          ]
        });
        yield tx.cloSkillLevelCriteria.createMany({
          data: [
            {
              courseId: course.id,
              cloId: cloId[0],
              skillLevelCriteriaId: skillLevelCriteria3.id
            },
            {
              courseId: course.id,
              cloId: cloId[1],
              skillLevelCriteriaId: skillLevelCriteria3.id
            },
            {
              courseId: course.id,
              cloId: cloId[2],
              skillLevelCriteriaId: skillLevelCriteria3.id
            }
          ]
        });
        yield tx.courseTeacher.create({
          data: {
            course: {
              connect: {
                id: course.id
              }
            },
            teacher: {
              connect: {
                id: teacherId
              }
            },
            courseSection: {
              connect: {
                id: courseSection.id
              }
            }
          }
        });
        const curriculumStudents = yield tx.student.findMany({
          where: {
            AND: [
              {
                isDeleted: false,
                affiliatedCurriculumId: curriculumId
              }
            ]
          }
        });
        for (const student of curriculumStudents) {
          const studentCourse = yield tx.studentCourse.create({
            data: {
              courseId: course.id,
              studentId: student.id,
              courseSectionId: courseSection.id
            }
          });
          const studentCourseGrading = yield tx.studentCourseGrading.create({
            data: {
              studentCourse: {
                connect: {
                  id: studentCourse.id
                }
              }
            }
          });
          yield tx.gradingCloResult.createMany({
            data: [
              {
                studentCourseGradingId: studentCourseGrading.id,
                cloId: cloId[0],
                result: "X",
                index: gradingCloIndex += 1
              },
              {
                studentCourseGradingId: studentCourseGrading.id,
                cloId: cloId[1],
                result: "X",
                index: gradingCloIndex += 1
              },
              {
                studentCourseGradingId: studentCourseGrading.id,
                cloId: cloId[2],
                result: "X",
                index: gradingCloIndex += 1
              },
              {
                studentCourseGradingId: studentCourseGrading.id,
                cloId: cloId[3],
                result: "X",
                index: gradingCloIndex += 1
              },
              {
                studentCourseGradingId: studentCourseGrading.id,
                cloId: cloId[4],
                result: "X",
                index: gradingCloIndex += 1
              },
              {
                studentCourseGradingId: studentCourseGrading.id,
                cloId: cloId[5],
                result: "X",
                index: gradingCloIndex += 1
              }
            ]
          });
        }
      }));
    } catch (err) {
      return error3("Internal Server Error", {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error"
        },
        data: null
      });
    }
    return {
      statusCode: 201,
      isSuccess: true,
      data: {
        message: "Course created successfully"
      },
      error: null
    };
  }),
  {
    body: createCourseRequestSchema,
    response: {
      201: import_elysia19.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: import_elysia19.t.Object({
          message: import_elysia19.t.String()
        })
      }))
    }
  }
);

// src/routes/users.route.ts
var import_elysia20 = __toESM(require("elysia"));
function getAllUsersByRole(role) {
  return __async(this, null, function* () {
    return yield prisma.user.findMany({
      where: {
        AND: [
          {
            isDeleted: false,
            role: role || void 0
          }
        ]
      },
      include: {
        admin: true,
        student: {
          include: {
            affiliatedCurriculum: {
              include: {
                faculty: {
                  include: {
                    university: true
                  }
                }
              }
            }
          }
        },
        teacher: {
          include: {
            affiliatedCurriculum: {
              include: {
                faculty: {
                  include: {
                    university: true
                  }
                }
              }
            }
          }
        }
      }
    });
  });
}
var usersRoute = new import_elysia20.default({
  name: "routes/v1/users",
  prefix: "/users",
  tags: ["users"]
}).use(authPlugin).guard({
  response: {
    401: errorResponseSchema,
    403: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema
  }
}).get(
  "/",
  (_0) => __async(null, [_0], function* ({ error: error3 }) {
    try {
      const users = yield getAllUsersByRole();
      return {
        statusCode: 200,
        isSuccess: true,
        error: null,
        data: users
      };
    } catch (err) {
      return error3("Internal Server Error", {
        statusCode: 500,
        isSuccess: false,
        error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
        data: null
      });
    }
  }),
  {
    response: {
      200: import_elysia20.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: import_elysia20.t.Array(getMeSchema)
      }))
    }
  }
).get("/teachers", (_0) => __async(null, [_0], function* ({ error: error3 }) {
  try {
    const teachers = yield getAllUsersByRole(prisma_exports.Role.TEACHER);
    return {
      statusCode: 200,
      isSuccess: true,
      error: null,
      data: teachers
    };
  } catch (err) {
    return error3("Internal Server Error", {
      statusCode: 500,
      isSuccess: false,
      error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
      data: null
    });
  }
})).get("/teachers/curriculum/:curriculumId", (_0) => __async(null, [_0], function* ({ error: error3, params }) {
  try {
    const { curriculumId } = params;
    const teachers = yield getAllUsersByRole(prisma_exports.Role.TEACHER);
    const filteredTeachers = teachers.filter(
      (teacher) => {
        var _a;
        return ((_a = teacher.teacher) == null ? void 0 : _a.affiliatedCurriculumId) === curriculumId;
      }
    );
    return {
      statusCode: 200,
      isSuccess: true,
      error: null,
      data: filteredTeachers
    };
  } catch (err) {
    return error3("Internal Server Error", {
      statusCode: 500,
      isSuccess: false,
      error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
      data: null
    });
  }
})).get("/students", (_0) => __async(null, [_0], function* ({ error: error3 }) {
  try {
    const students = yield getAllUsersByRole(prisma_exports.Role.STUDENT);
    return {
      statusCode: 200,
      isSuccess: true,
      error: null,
      data: students
    };
  } catch (err) {
    return error3("Internal Server Error", {
      statusCode: 500,
      isSuccess: false,
      error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
      data: null
    });
  }
})).get("/students/curriculum/:curriculumId", (_0) => __async(null, [_0], function* ({ error: error3, params }) {
  try {
    const { curriculumId } = params;
    const students = yield getAllUsersByRole(prisma_exports.Role.STUDENT);
    const filteredStudents = students.filter(
      (student) => {
        var _a;
        return ((_a = student.student) == null ? void 0 : _a.affiliatedCurriculumId) === curriculumId;
      }
    );
    return {
      statusCode: 200,
      isSuccess: true,
      error: null,
      data: filteredStudents
    };
  } catch (err) {
    return error3("Internal Server Error", {
      statusCode: 500,
      isSuccess: false,
      error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
      data: null
    });
  }
}));

// src/routes/gradings.route.ts
var import_elysia21 = __toESM(require("elysia"));

// src/libs/grade.ts
var cloResultToNumber = (result) => {
  switch (result) {
    case "EXCELLENT":
      return 4;
    case "VERY_GOOD":
      return 3;
    case "GOOD":
      return 2;
    case "PASS":
      return 1;
    case "FAIL":
      return 0;
    case "X":
      return 0;
  }
};
var getGradingCriteriaByGrade = (criteria, grade) => {
  return criteria.find((criteria2) => criteria2.grade === grade) || {
    minScore: 0,
    maxScore: 0
  };
};
var getStudentGradeByScore = (criteria, score) => {
  const a = getGradingCriteriaByGrade(criteria, "A");
  const bPlus = getGradingCriteriaByGrade(criteria, "B_PLUS");
  const b = getGradingCriteriaByGrade(criteria, "B");
  const cPlus = getGradingCriteriaByGrade(criteria, "C_PLUS");
  const c = getGradingCriteriaByGrade(criteria, "C");
  const dPlus = getGradingCriteriaByGrade(criteria, "D_PLUS");
  const d = getGradingCriteriaByGrade(criteria, "D");
  const f = getGradingCriteriaByGrade(criteria, "F");
  const isSomeZero = [a, bPlus, b, cPlus, c, dPlus, d, f].some(
    (v) => v.minScore === 0 && v.maxScore === 0
  );
  if (isSomeZero) return "X";
  console.log;
  if (score >= a.minScore && score <= a.maxScore) return "A";
  if (score >= bPlus.minScore && score <= bPlus.maxScore) return "B_PLUS";
  if (score >= b.minScore && score <= b.maxScore) return "B";
  if (score >= cPlus.minScore && score <= cPlus.maxScore) return "C_PLUS";
  if (score >= c.minScore && score <= c.maxScore) return "C";
  if (score >= dPlus.minScore && score <= dPlus.maxScore) return "D_PLUS";
  if (score >= d.minScore && score <= d.maxScore) return "D";
  if (score >= f.minScore && score <= f.maxScore) return "F";
  else return "X";
};

// src/routes/gradings.route.ts
var gradingsRoutes = new import_elysia21.default({
  name: "routes/v1/gradings",
  prefix: "/gradings",
  tags: ["gradings"]
}).use(authPlugin).guard({
  response: {
    401: errorResponseSchema,
    403: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema
  }
}).put(
  "/settings/grade-criteria",
  (_0) => __async(null, [_0], function* ({ body, error: error3 }) {
    try {
      yield prisma.$transaction((tx) => __async(null, null, function* () {
        for (let criteria of body) {
          yield tx.courseGradingCriteria.update({
            where: {
              id: criteria.courseGradingCriteriaId
            },
            data: {
              minScore: criteria.minScore,
              maxScore: criteria.maxScore
            }
          });
        }
      }));
      return {
        statusCode: 200,
        isSuccess: true,
        data: body.map((criteria) => ({
          courseGradingCriteriaId: criteria.courseGradingCriteriaId,
          minScore: criteria.minScore,
          maxScore: criteria.maxScore
        })),
        error: null
      };
    } catch (err) {
      return error3(500, {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: error3 instanceof Error ? error3.message : "Internal Server Error"
        },
        data: null
      });
    }
  }),
  {
    body: gradingCriteriaRequestSchema,
    response: {
      200: import_elysia21.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: gradingCriteriaResponseSchema
      }))
    }
  }
).put(
  "/settings/clo-weights/",
  (_0) => __async(null, [_0], function* ({ body, error: error3 }) {
    try {
      yield prisma.$transaction((tx) => __async(null, null, function* () {
        for (let weight of body) {
          yield tx.courseCloWeight.update({
            where: {
              id: weight.courseCloWeightId
            },
            data: {
              weight: weight.weight
            }
          });
        }
      }));
      return {
        statusCode: 200,
        isSuccess: true,
        data: body.map((weight) => ({
          courseCloWeightId: weight.courseCloWeightId,
          weight: weight.weight
        })),
        error: null
      };
    } catch (err) {
      return error3(500, {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error"
        },
        data: null
      });
    }
  }),
  {
    body: cloWeightSettingsRequestSchema,
    response: {
      200: import_elysia21.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: cloWeightSettingsResponseSchema
      }))
    }
  }
).put(
  "/students/grades",
  (_0) => __async(null, [_0], function* ({ body, error: error3 }) {
    try {
      const { courseId, studentId, cloId, grade } = body;
      const studentCourseGrading = yield prisma.studentCourseGrading.findFirst({
        where: {
          studentCourse: {
            courseId,
            studentId
          }
        }
      });
      if (!studentCourseGrading) {
        return error3(404, ERROR_RESPONSES.notFound);
      }
      const gragingCloResult = yield prisma.gradingCloResult.updateMany({
        where: {
          studentCourseGrading: {
            id: studentCourseGrading.id
          },
          cloId
        },
        data: {
          result: grade
        }
      });
      if (gragingCloResult.count === 0) {
        return error3(404, ERROR_RESPONSES.notFound);
      }
      return {
        statusCode: 200,
        isSuccess: true,
        data: {
          courseId,
          studentId,
          cloId,
          grade
        },
        error: null
      };
    } catch (err) {
      return error3(500, {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error"
        },
        data: null
      });
    }
  }),
  {
    body: studentGradingRequestSchema,
    response: {
      200: import_elysia21.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: studentGradingResponseSchema
      }))
    }
  }
).post(
  "/announce",
  (_0) => __async(null, [_0], function* ({ body, error: error3 }) {
    const { courseId } = body;
    try {
      const course = yield prisma.course.findUnique({
        where: {
          id: courseId
        }
      });
      if (!course) return error3(404, ERROR_RESPONSES.notFound);
      const cloWeightSettings = yield prisma.courseCloWeight.findMany({
        where: {
          courseId
        }
      });
      if (cloWeightSettings.length === 0) return error3(404, ERROR_RESPONSES.notFound);
      const courseGradingCriterias = yield prisma.courseGradingCriteria.findMany({
        where: {
          courseId
        }
      });
      if (courseGradingCriterias.length === 0) return error3(404, ERROR_RESPONSES.notFound);
      const courseStudents = yield prisma.studentCourse.findMany({
        where: {
          courseId
        }
      });
      const cloWeightSum = cloWeightSettings.reduce((sum, weight) => sum + 4 * weight.weight, 0);
      for (const courseStudent of courseStudents) {
        const studentId = courseStudent.studentId;
        const studentCourse = yield prisma.studentCourse.findFirst({
          where: {
            AND: {
              courseId,
              studentId
            }
          }
        });
        const studentCourseGrading = yield prisma.studentCourseGrading.findFirst({
          where: {
            studentCourseId: studentCourse == null ? void 0 : studentCourse.id
          },
          include: {
            gradingCloResults: true
          }
        });
        let totalScore = 0;
        for (const cloWeight of cloWeightSettings) {
          const gradingCloResult = studentCourseGrading == null ? void 0 : studentCourseGrading.gradingCloResults.find(
            (result) => result.cloId === cloWeight.cloId
          );
          if (gradingCloResult) {
            const cloResultScore = cloResultToNumber(gradingCloResult.result);
            totalScore += (gradingCloResult.result === "X" ? 0 : cloResultScore) * cloWeight.weight;
          }
        }
        totalScore = Math.round(totalScore / cloWeightSum * 100);
        const grade = getStudentGradeByScore(courseGradingCriterias, totalScore);
        console.log(`Student ID: ${studentId}, Total Score: ${totalScore}, Grade: ${grade}`);
        yield prisma.studentCourseGrading.update({
          where: {
            id: (studentCourseGrading == null ? void 0 : studentCourseGrading.id) || ""
          },
          data: {
            score: totalScore,
            grade,
            gradingDate: /* @__PURE__ */ new Date()
          }
        });
      }
      return {
        statusCode: 201,
        isSuccess: true,
        data: {
          message: "Grading have been successfully announced."
        },
        error: null
      };
    } catch (err) {
      return error3(500, {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error"
        },
        data: null
      });
    }
  }),
  {
    body: gradeAnnouncementRequestSchema,
    response: {
      201: import_elysia21.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: import_elysia21.t.Object({
          message: import_elysia21.t.String()
        })
      }))
    }
  }
);

// src/routes/students.route.ts
var import_elysia23 = __toESM(require("elysia"));

// src/schemas/student.schema.ts
var import_elysia22 = require("elysia");
var studentSchema = {
  id: import_elysia22.t.String(),
  universityStudentId: import_elysia22.t.String(),
  identificationNumber: import_elysia22.t.String(),
  birthDate: import_elysia22.t.Date(),
  enrolledDate: import_elysia22.t.Date(),
  affiliatedCurriculumId: import_elysia22.t.String(),
  affiliatedCurriculum: import_elysia22.t.Optional(import_elysia22.t.Object({}))
};
var studentCourseBaseSchema = __spreadValues({
  id: import_elysia22.t.String(),
  courseId: import_elysia22.t.String(),
  studentId: import_elysia22.t.String(),
  courseSectionId: import_elysia22.t.String()
}, softDeleteBaseSchema);
var teacherWithStudentSchema = {
  id: import_elysia22.t.String(),
  universityTeacherId: import_elysia22.t.String(),
  identificationNumber: import_elysia22.t.String(),
  affiliatedCurriculumId: import_elysia22.t.String(),
  userId: import_elysia22.t.String(),
  user: import_elysia22.t.Object(__spreadValues({
    id: import_elysia22.t.String(),
    nameTitle: import_elysia22.t.String(),
    firstName: import_elysia22.t.String(),
    lastName: import_elysia22.t.String(),
    email: import_elysia22.t.String(),
    password: import_elysia22.t.String(),
    sex: import_elysia22.t.String(),
    role: import_elysia22.t.String()
  }, softDeleteBaseSchema))
};
var studentResponseSchema = import_elysia22.t.Array(
  import_elysia22.t.Object(__spreadProps(__spreadValues({}, studentCourseBaseSchema), {
    course: import_elysia22.t.Object(__spreadProps(__spreadValues({}, courseBaseSchema), { teacher: import_elysia22.t.Object(teacherWithStudentSchema) })),
    gradings: import_elysia22.t.Object(__spreadProps(__spreadValues({}, studentCourseGradingBaseSchema), {
      gradingCloResults: import_elysia22.t.Array(
        import_elysia22.t.Object(__spreadProps(__spreadValues({}, gradingCloResultBaseSchema), {
          clo: import_elysia22.t.Object(__spreadValues({}, cloBaseSchema))
        }))
      )
    }))
  }))
);
var studentSkillsResponseSchema = import_elysia22.t.Object({
  skillsWithLevels: import_elysia22.t.Array(
    import_elysia22.t.Object({
      finalLevel: import_elysia22.t.Number(),
      nameEn: import_elysia22.t.String(),
      nameTh: import_elysia22.t.String(),
      descriptionTh: import_elysia22.t.String(),
      descriptionEn: import_elysia22.t.String(),
      type: import_elysia22.t.String(),
      isMainSkill: import_elysia22.t.Boolean(),
      skillLevels: import_elysia22.t.Array(
        import_elysia22.t.Array(
          import_elysia22.t.Object({
            id: import_elysia22.t.String(),
            criteriaNameTh: import_elysia22.t.String(),
            criteriaNameEn: import_elysia22.t.String(),
            criterias: import_elysia22.t.Array(
              import_elysia22.t.Object({
                isPass: import_elysia22.t.Boolean(),
                courseCode: import_elysia22.t.String(),
                courseName: import_elysia22.t.String(),
                clo: import_elysia22.t.Object(__spreadValues({}, cloBaseSchema))
              })
            )
          })
        )
      )
    })
  )
});

// src/routes/students.route.ts
var studentsRoutes = new import_elysia23.default({
  name: "routes/v1/students",
  prefix: "/students",
  tags: ["students"]
}).use(authPlugin).guard({
  response: {
    401: errorResponseSchema,
    403: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema
  }
}).get(
  "/:studentId",
  (_0) => __async(null, [_0], function* ({ params, error: error3 }) {
    try {
      const { studentId } = params;
      const studentCourses = yield prisma.studentCourse.findMany({
        where: {
          studentId,
          isDeleted: false
        },
        include: {
          course: {
            include: {
              teachers: {
                include: {
                  teacher: {
                    include: {
                      user: true
                    }
                  }
                }
              }
            }
          },
          gradings: {
            where: {
              isDeleted: false
            },
            orderBy: {
              gradingDate: "desc"
            },
            include: {
              gradingCloResults: {
                include: {
                  clo: true
                }
              }
            }
          }
        }
      });
      if (!studentCourses || studentCourses.length === 0) {
        return error3(404, ERROR_RESPONSES.notFound);
      }
      const mappedData = studentCourses.map((sc) => {
        var _a;
        return {
          id: sc.id,
          courseId: sc.courseId,
          studentId: sc.studentId,
          courseSectionId: (_a = sc.courseSectionId) != null ? _a : "",
          isDeleted: sc.isDeleted,
          deletedAt: sc.deletedAt,
          course: __spreadProps(__spreadValues({}, sc.course), {
            teacher: __spreadValues({}, sc.course.teachers[0].teacher)
          }),
          gradings: {
            id: sc.gradings[0].id,
            studentCourseId: sc.gradings[0].studentCourseId,
            gradingDate: sc.gradings[0].gradingDate,
            grade: sc.gradings[0].grade,
            score: sc.gradings[0].score,
            isDeleted: sc.gradings[0].isDeleted,
            deletedAt: sc.gradings[0].deletedAt,
            gradingCloResults: sc.gradings[0].gradingCloResults.map((gcr) => ({
              id: gcr.id,
              studentCourseGradingId: gcr.studentCourseGradingId,
              cloId: gcr.cloId,
              result: gcr.result,
              index: gcr.index,
              isDeleted: gcr.isDeleted,
              deletedAt: gcr.deletedAt,
              clo: {
                id: gcr.clo.id,
                type: gcr.clo.type,
                name: gcr.clo.name,
                isDeleted: gcr.clo.isDeleted,
                deletedAt: gcr.clo.deletedAt
              }
            }))
          }
        };
      });
      return {
        statusCode: 200,
        isSuccess: true,
        data: mappedData,
        error: null
      };
    } catch (err) {
      return error3(500, {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error"
        },
        data: null
      });
    }
  }),
  {
    response: {
      200: import_elysia23.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: studentResponseSchema
      }))
    }
  }
).get(
  "/:studentId/skills",
  (_0) => __async(null, [_0], function* ({ params, error: error3 }) {
    try {
      const { studentId } = params;
      const coursesAndCloResults = yield getStudentCoursesAndCloResults(studentId);
      if (!coursesAndCloResults) return error3(404, ERROR_RESPONSES.notFound);
      const studentSkillIds = coursesAndCloResults.map((course) => course.courseSkills).flat().map((cs) => cs.skillId);
      const uniqueStudentSkills = Array.from(new Set(studentSkillIds));
      const skillsWithLevels = [];
      for (const skillId of uniqueStudentSkills) {
        const skill = yield prisma.skill.findUnique({
          where: {
            id: skillId
          },
          include: {
            skillLevels: {
              select: {
                skillId: true,
                criterias: {
                  select: {
                    id: true,
                    criteriaNameTh: true,
                    criteriaNameEn: true
                  }
                }
              }
            }
          }
        });
        const levels = coursesAndCloResults.map((course) => __spreadValues({}, course.courseSkills.find((cs) => cs.skillId === skillId))).map((sl) => sl.studentLevel !== void 0 ? sl.studentLevel : 0);
        skillsWithLevels.push(__spreadValues({
          finalLevel: Math.min(...levels)
        }, skill));
      }
      const crteriaIdAndCourseIdToCloMap = /* @__PURE__ */ new Map();
      for (const courseSkill of coursesAndCloResults.flatMap((course) => course.courseSkills)) {
        for (const skillLevel of courseSkill.skillLevels) {
          for (const criteria of skillLevel.criterias) {
            const courseId = criteria.cloSkillLevelCriterias[0].courseId;
            const course = yield prisma.course.findUnique({
              where: {
                id: courseId,
                isDeleted: false
              }
            });
            const prev = crteriaIdAndCourseIdToCloMap.get(
              `${criteria.id}::${courseSkill.skillId}`
            );
            if (prev) {
              prev.push(
                ...criteria.cloSkillLevelCriterias.map((clc) => {
                  var _a, _b;
                  return {
                    clo: clc.clo,
                    isPass: clc.isPass,
                    courseCode: (_a = course == null ? void 0 : course.courseCode) != null ? _a : "",
                    courseName: (_b = course == null ? void 0 : course.nameEn) != null ? _b : ""
                  };
                })
              );
            } else {
              crteriaIdAndCourseIdToCloMap.set(
                `${criteria.id}::${courseSkill.skillId}`,
                criteria.cloSkillLevelCriterias.map((clc) => {
                  var _a, _b;
                  return {
                    clo: clc.clo,
                    isPass: clc.isPass,
                    courseCode: (_a = course == null ? void 0 : course.courseCode) != null ? _a : "",
                    courseName: (_b = course == null ? void 0 : course.nameEn) != null ? _b : ""
                  };
                })
              );
            }
          }
        }
      }
      const xx = skillsWithLevels.map((skill) => {
        var _a;
        return __spreadProps(__spreadValues({}, skill), {
          skillLevels: (_a = skill.skillLevels) == null ? void 0 : _a.map(
            (sl) => sl.criterias.map((c) => __spreadProps(__spreadValues({}, c), {
              criterias: crteriaIdAndCourseIdToCloMap.get(`${c.id}::${skill.id}`)
            }))
          )
        });
      });
      return {
        statusCode: 200,
        isSuccess: true,
        data: {
          // s: Array.from(crteriaIdAndCourseIdToCloMap.keys()),
          skillsWithLevels: xx
          // coursesAndCloResults: coursesAndCloResults,
        },
        error: null
      };
    } catch (err) {
      return error3(500, {
        statusCode: 500,
        isSuccess: false,
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error"
        },
        data: null
      });
    }
  }),
  {
    response: {
      200: import_elysia23.t.Object(__spreadProps(__spreadValues({}, baseResponseSchema), {
        data: studentSkillsResponseSchema
      }))
    }
  }
);
function getCourseSkillsLevelsCriterias(courseId) {
  return __async(this, null, function* () {
    return yield prisma.course.findUnique({
      where: {
        id: courseId,
        isDeleted: false
      },
      include: {
        courseSkills: {
          where: {
            courseId,
            isDeleted: false
          },
          include: {
            skill: {
              include: {
                skillLevels: {
                  where: {
                    isDeleted: false
                  },
                  include: {
                    methods: {
                      where: {
                        isDeleted: false
                      }
                    },
                    criterias: {
                      where: {
                        isDeleted: false
                      },
                      include: {
                        cloSkillLevelCriterias: {
                          where: {
                            courseId,
                            isDeleted: false
                          },
                          include: {
                            clo: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  });
}
function getStudentCourseGradingAndCloResults(studentId, courseId) {
  return __async(this, null, function* () {
    return prisma.studentCourseGrading.findFirst({
      where: {
        studentCourse: {
          studentId,
          courseId,
          isDeleted: false
        }
      },
      include: {
        gradingCloResults: true
      }
    });
  });
}
function getLevelsAndCriteriasPassingStatus(levelAndCriterias, gradingCloResults) {
  const cloResultMap = new Map(gradingCloResults.map((gcr) => [gcr.cloId, gcr]));
  const criteriasWithStatus = levelAndCriterias.criterias.map((criteria) => {
    const cloSkillLevelCriteriasWithStatus = criteria.cloSkillLevelCriterias.map((clo) => {
      const cloResult = cloResultMap.get(clo.cloId);
      return __spreadProps(__spreadValues({}, clo), {
        isPass: cloResult ? cloResult.result !== "X" && cloResult.result !== "FAIL" : false
      });
    });
    return __spreadProps(__spreadValues({}, criteria), {
      cloSkillLevelCriterias: cloSkillLevelCriteriasWithStatus
    });
  });
  const isPass = criteriasWithStatus.every(
    (criteria) => criteria.cloSkillLevelCriterias.every((clo) => clo.isPass)
  );
  return {
    level: levelAndCriterias.level,
    isPass,
    criterias: criteriasWithStatus
  };
}
function getStudentCoursesAndCloResults(studentId) {
  return __async(this, null, function* () {
    const studentCourses = yield prisma.studentCourse.findMany({
      where: {
        studentId,
        isDeleted: false
      }
    });
    const coursesAndCloResults = [];
    for (const studentCourse of studentCourses) {
      const courseId = studentCourse.courseId;
      const courseSkillsLevelsCriterias = getCourseSkillsLevelsCriterias(courseId);
      const studentCourseGradingAndCloResults = getStudentCourseGradingAndCloResults(
        studentId,
        courseId
      );
      const [cslc, sclc] = yield Promise.all([
        courseSkillsLevelsCriterias,
        studentCourseGradingAndCloResults
      ]);
      if (!cslc || !sclc) continue;
      const result = {
        id: cslc.id,
        skillMappingRefId: cslc.skillMappingRefId,
        courseCode: cslc.courseCode,
        nameTh: cslc.nameTh,
        nameEn: cslc.nameEn,
        descriptionTh: cslc.descriptionTh,
        descriptionEn: cslc.descriptionEn,
        curriculumId: cslc.curriculumId,
        isDeleted: cslc.isDeleted,
        deletedAt: cslc.deletedAt,
        courseSkills: cslc.courseSkills.map((cs) => ({
          skillMappingRefId: cs.skill.skillMappingRefId,
          nameTh: cs.skill.nameTh,
          nameEn: cs.skill.nameEn,
          descriptionTh: cs.skill.descriptionTh,
          descriptionEn: cs.skill.descriptionEn,
          type: cs.skill.type,
          isMainSkill: cs.skill.isMainSkill,
          studentLevel: 0,
          // This will be calculated later
          id: cs.id,
          skillId: cs.skillId,
          skillLevels: cs.skill.skillLevels.map((sl) => __spreadProps(__spreadValues({
            id: sl.id,
            skillId: sl.skillId
          }, getLevelsAndCriteriasPassingStatus(
            {
              level: sl.level,
              criterias: sl.criterias.map((c) => ({
                id: c.id,
                skillLevelId: c.skillLevelId,
                criteriaNameTh: c.criteriaNameTh,
                criteriaNameEn: c.criteriaNameEn,
                isDeleted: c.isDeleted,
                deletedAt: c.deletedAt,
                cloSkillLevelCriterias: c.cloSkillLevelCriterias.map((clc) => ({
                  id: clc.id,
                  courseId: clc.courseId,
                  clo: clc.clo,
                  cloId: clc.cloId,
                  skillLevelCriteriaId: clc.skillLevelCriteriaId
                }))
              }))
            },
            sclc.gradingCloResults
          )), {
            descriptionTh: sl.descriptionTh,
            descriptionEn: sl.descriptionEn,
            methods: sl.methods.map((m) => ({
              id: m.id,
              skillLevelId: m.skillLevelId,
              methodNameTh: m.methodNameTh,
              methodNameEn: m.methodNameEn,
              isDeleted: m.isDeleted,
              deletedAt: m.deletedAt
            })),
            isDeleted: sl.isDeleted,
            deletedAt: sl.deletedAt
          }))
        }))
      };
      for (const courseSkill of result.courseSkills) {
        let maxLevel = 0;
        for (const level of courseSkill.skillLevels) {
          if (!level.isPass) break;
          maxLevel = level.level;
        }
        courseSkill.studentLevel = maxLevel;
      }
      coursesAndCloResults.push(result);
    }
    return coursesAndCloResults;
  });
}

// src/routes/app.route.ts
var routes = new import_elysia24.default({
  prefix: "/api/v1"
}).use(authRoutes).use(facultiesRoutes).use(coursesRoutes).use(usersRoute).use(gradingsRoutes).use(studentsRoutes);

// src/index.ts
var import_cors = require("@elysiajs/cors");
var import_swagger = require("@elysiajs/swagger");
var app = new import_elysia25.Elysia({ adapter: (0, import_node.node)() }).use((0, import_swagger.swagger)()).use((0, import_cors.cors)()).get("/", () => "Hello Elysia").use(routes).listen(3333, ({ hostname, port }) => {
  console.log(`\u{1F98A} Elysia is running at ${hostname}:${port}`);
});
