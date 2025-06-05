import Elysia, { t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { getMeSchema, signInRequestSchema } from "../schemas/auth.schema";
import { baseResponseSchema } from "./response";
import { prisma } from "../config/prisma";
import { ERROR_RESPONSES } from "../error";
import { errorResponseSchema } from "../schemas/response.schema";
import bcrypt from "bcryptjs";
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from "../constants/jwt";
import { getExpTimestamp } from "../libs/jwt";

export const authRoutes = new Elysia({
  name: "routes/v1/auth",
  prefix: "/auth",
  tags: ["Auth"],
})
  .use(authPlugin)
  .guard({
    response: {
      401: errorResponseSchema,
      403: errorResponseSchema,
    },
  })

  .post(
    "/signin",
    async ({ body, jwt, cookie: { accessToken, refreshToken }, set, error }) => {
      const { email, password } = body;

      const dbUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          admin: true,
          student: {
            include: {
              affiliatedCurriculum: {
                include: {
                  faculty: {
                    include: {
                      university: true,
                    },
                  },
                },
              },
            },
          },
          teacher: {
            include: {
              affiliatedCurriculum: {
                include: {
                  faculty: {
                    include: {
                      university: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!dbUser) {
        return error("Unauthorized", ERROR_RESPONSES.unauthorized);
      }

      const isPasswordMatch = await bcrypt.compare(password, dbUser.password);

      if (!isPasswordMatch) {
        return error("Unauthorized", ERROR_RESPONSES.unauthorized);
      }

      const accessJWTToken = await jwt.sign({
        sub: dbUser.id,
        iat: Date.now(),
        exp: getExpTimestamp(ACCESS_TOKEN_EXP),
      });

      accessToken.set({
        value: accessJWTToken,
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXP,
        path: "/",
      });

      const refreshJWTToken = await jwt.sign({
        sub: dbUser.id,
        exp: getExpTimestamp(REFRESH_TOKEN_EXP),
      });

      refreshToken.set({
        value: refreshJWTToken,
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXP,
        path: "/",
      });

      return {
        statusCode: 200,
        isSuccess: true,
        error: null,
        data: {
          user: dbUser,
          accessToken: accessJWTToken,
          refreshToken: refreshJWTToken,
        },
      };
    },
    {
      body: signInRequestSchema,
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: t.Object({
            user: getMeSchema,
            accessToken: t.String(),
            refreshToken: t.String(),
          }),
        }),
      },
    }
  )

  .post(
    "/signout",
    async ({ cookie: { accessToken, refreshToken } }) => {
      try {
        accessToken.remove();
        refreshToken.remove();

        return {
          statusCode: 200,
          isSuccess: true,
          error: null,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    {
      auth: {
        requireAuth: true,
      },
      response: {
        200: t.Object({
          ...baseResponseSchema,
        }),
      },
    }
  )

  .post(
    "/refresh",
    async ({ cookie: { accessToken, refreshToken }, jwt, set, error }) => {
      if (!refreshToken.value) {
        return error(401, ERROR_RESPONSES.unauthorized);
      }

      const jwtPayload = await jwt.verify(refreshToken.value);
      if (!jwtPayload || !jwtPayload.sub) {
        return error(401, ERROR_RESPONSES.unauthorized);
      }

      const userId = jwtPayload.sub;
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          admin: true,
          student: {
            include: {
              affiliatedCurriculum: {
                include: {
                  faculty: {
                    include: {
                      university: true,
                    },
                  },
                },
              },
            },
          },
          teacher: {
            include: {
              affiliatedCurriculum: {
                include: {
                  faculty: {
                    include: {
                      university: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!dbUser) {
        return error(401, ERROR_RESPONSES.unauthorized);
      }

      const accessJWTToken = await jwt.sign({
        sub: dbUser.id,
        iat: Date.now(),
        exp: getExpTimestamp(ACCESS_TOKEN_EXP),
      });

      accessToken.set({
        value: accessJWTToken,
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXP,
        path: "/",
      });

      const refreshJWTToken = await jwt.sign({
        sub: dbUser.id,
        exp: getExpTimestamp(REFRESH_TOKEN_EXP),
      });

      refreshToken.set({
        value: refreshJWTToken,
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXP,
        path: "/",
      });

      return {
        statusCode: 200,
        isSuccess: true,
        error: null,
        data: {
          user: dbUser,
          accessToken: accessJWTToken,
          refreshToken: refreshJWTToken,
        },
      };
    },
    {
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: t.Object({
            user: getMeSchema,
            accessToken: t.String(),
            refreshToken: t.String(),
          }),
        }),
      },
    }
  )

  .get(
    "/me",
    async ({ authUser }) => {
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
          student: authUser.student ?? null,
          teacher: authUser.teacher ?? null,
          admin: authUser.admin ?? null,
        },
      };
    },
    {
      auth: {
        requireAuth: true,
      },
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: getMeSchema,
        }),
      },
    }
  );
